using Application.Core;
using Application.Interfaces;
using Application.Profiles.DTOs;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Profiles.queries
{
    public class GetFollowings
    {
        public class Query : IRequest<Result<List<UserProfile>>>
        {
            public string Predicate { get; set; } = "followers";

            public required string UserId { get; set; }
        }


        public class Handler(AppDBContext dBContext,IMapper mapper, IUserAccessor userAccessor) : IRequestHandler<Query, Result<List<UserProfile>>>
        {
            public async Task<Result<List<UserProfile>>> Handle(Query req, CancellationToken cancellationToken)
            {
                
                List<UserProfile> profiles = new List<UserProfile>();

                switch(req.Predicate)
                {
                    case "followers" 
                        :
                            profiles = await dBContext.UserFollowings.Where(x => x.TargetId == req.UserId)
                            .Select(x => x.Observer)
                            .ProjectTo<UserProfile>(mapper.ConfigurationProvider,
                                new { currentUserId = userAccessor.GetUserID() })
                            .ToListAsync(cancellationToken);
                            break;
                    case "followings"
                        :
                            profiles = await dBContext.UserFollowings.Where(x => x.ObserverId == req.UserId)
                            .Select(x => x.Target)
                            .ProjectTo<UserProfile>(mapper.ConfigurationProvider,
                                new { currentUserId = userAccessor.GetUserID() })
                            .ToListAsync(cancellationToken);
                            break;
                }

                return Result<List<UserProfile>>.Success(profiles);
            }
        }
    }
}
