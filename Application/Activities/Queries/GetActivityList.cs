using Application.Activities.DTOs;
using Application.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using Application.Core;
using System.Linq;


namespace Application.Activities.Queries;

public class GetActivityList
{

    public class Query : IRequest<Result<PagedList<ActivityDto,DateTime?>>>
    {
        public required ActivityParams activityParams;
    }

    public class Handler(AppDBContext context, IMapper mapper, IUserAccessor userAccessor) 
        : IRequestHandler<Query, Result<PagedList<ActivityDto, DateTime?>>>
    {
        public async Task<Result<PagedList<ActivityDto, DateTime?>>> Handle(Query request, CancellationToken cancellationToken)
        {
            var query = context.Activities
                .OrderBy(a => a.Date)
                .Where(x => x.Date >= (request.activityParams.cursor ?? request.activityParams.StartDate))
                .AsQueryable();

            if (!string.IsNullOrEmpty(request.activityParams.Filter))
            {
                query = request.activityParams.Filter switch
                {
                    "isGoing" => query.Where(x => x.Attendees.Any(a => a.UserId == userAccessor.GetUserID())),
                    "isHosting" => query.Where(x => x.Attendees.Any(a => a.IsHost && a.UserId == userAccessor.GetUserID())),
                    _ => query
                };
            }

            var projectedActivities = query
                                .ProjectTo<ActivityDto>(mapper.ConfigurationProvider,
                                new { currentUserId = userAccessor.GetUserID() });

            var activities =  await projectedActivities
                .Take(request.activityParams.PageSize + 1)
                .ToListAsync(cancellationToken);

            DateTime? nextCursor = null;
            if (activities.Count > request.activityParams.PageSize)
            {
                nextCursor = activities.Last().Date;
                activities.RemoveAt(activities.Count - 1);
            }

            return Result<PagedList<ActivityDto, DateTime?>>.Success(new PagedList<ActivityDto,DateTime?>
            {
                Items = activities,
                NextCursor = nextCursor
            });


        }
    }
}

