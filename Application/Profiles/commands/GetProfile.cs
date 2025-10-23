using Application.Core;
using Application.Interfaces;
using Application.Profiles.DTOs;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Profiles.commands
{
    public class GetProfile
    {
        public class Query : IRequest<Result<UserProfile>>
        {
            public required string UserID;
        }

        public class RequestHandler(
            AppDBContext dBContext, 
            IMapper mapper,
            IUserAccessor userAccessor
        ) 
            : IRequestHandler<Query, Result<UserProfile>>
        {
            public async Task<Result<UserProfile>> Handle(Query request, CancellationToken cancellationToken)
            {

                var profile = await dBContext.Users
                    .ProjectTo<UserProfile>(mapper.ConfigurationProvider,
                        new { currentUserId = userAccessor.GetUserID()})
                    .SingleOrDefaultAsync(x => x.Id == request.UserID,cancellationToken);

                return (profile == null) ? Result<UserProfile>.Failure("Profile Not found",400) : Result<UserProfile>.Success(profile);
            }
        }

    }
}
