using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using Application.Activities.DTOs;
using Application.Core;
using Application.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities.Queries;

public class GetActivityDetails
{
    public class Query : IRequest<Result<ActivityDto>>
    {
        public string Id { get; set; }
    }

    public class Handler(AppDBContext context, IMapper autoMapper, IUserAccessor userAccessor) : IRequestHandler<Query, Result<ActivityDto>>
    {
        public async Task<Result<ActivityDto>> Handle(Query request, CancellationToken cancellationToken)
        {
            var activity = await context.Activities
                .ProjectTo<ActivityDto>(autoMapper.ConfigurationProvider,
                    new { currentUserId = userAccessor.GetUserID() })
                .FirstOrDefaultAsync(x => request.Id == x.Id, cancellationToken);

            if (activity == null)
                return Result<ActivityDto>.Failure("Activity not found!!", (int)HttpStatusCode.NotFound);

            return Result<ActivityDto>.Success(activity);
        }
    }
}