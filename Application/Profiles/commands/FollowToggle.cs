using Application.Core;
using Application.Interfaces;
using Domain;
using MediatR;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Profiles.commands
{
    public class FollowToggle
    {
        public class Command : IRequest<Result<Unit>>
        {
            public required string TargetUserId;
        }

        public class RequestHandler(
            AppDBContext dBContext, 
            IUserAccessor userAccessor
        ) 
            : IRequestHandler<Command, Result<Unit>>
        {
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var observer = await userAccessor.GetUserAsync();
                var target = await dBContext.Users.FindAsync([request.TargetUserId],cancellationToken);

                if (target is null)
                    return Result<Unit>.Failure("Target user not found", 400);

                var following = await dBContext.UserFollowings.FindAsync([observer.Id, target.Id]);

                if (following is not null)
                {
                    dBContext.UserFollowings.Remove(following);
                }
                else
                {   dBContext.UserFollowings.Add(
                        new UserFollowing 
                        { 
                            ObserverId=observer.Id,
                            TargetId=target.Id
                        }
                    );
                }

                var res = await dBContext.SaveChangesAsync() > 0;

                return (res) ? Result<Unit>.Success(Unit.Value) : Result<Unit>.Failure("Problem updating following!", 400);
            }
        }

    }
}
