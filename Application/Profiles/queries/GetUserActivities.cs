using Application.Core;
using Application.Interfaces;
using Application.Profiles.DTOs;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System.Linq;

namespace Application.Profiles.queries
{

    public class GetUserActivities
    {
        public class Query : IRequest<Result<List<UserActivityDto>>>
        {
            public required string UserId { get; set; }

            public string Filter { get; set; } = "past";

        }


        public class Handler(AppDBContext context, IMapper mapper) : IRequestHandler<Query, Result<List<UserActivityDto>>>
        {
            public async Task<Result<List<UserActivityDto>>> Handle(Query req, CancellationToken cancellationToken)
            {

                var query = context.ActivityAttendee
                    .Where(x => x.UserId == req.UserId)
                    .OrderBy( a => a.Activity.Date)
                    .Select(x=> x.Activity)
                    .AsQueryable();

                var Today = DateTime.UtcNow;

                query = req.Filter
                switch
                {
                    "past" => query.Where(x => x.Attendees.Any(d => d.UserId == req.UserId) && x.Date <= Today),
                    "hosting" => query.Where(x => x.Attendees.Any(d => (d.UserId == req.UserId && d.IsHost))),
                    _ => query.Where(x => x.Attendees.Any(d => (d.UserId == req.UserId && x.Date >= Today)))
                };

                var projectedActivities = query.ProjectTo<UserActivityDto>(mapper.ConfigurationProvider);
                List<UserActivityDto> userActivities = await projectedActivities.ToListAsync(cancellationToken);

                return Result<List<UserActivityDto>>.Success(userActivities);
            }
        }
    }
}
