﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities.Queries;

public class GetActivityDetails
{
    public class Query : IRequest<Result<Activity>>
    {
        public string Id { get; set; }
    }

    public class Handler(AppDBContext context) : IRequestHandler<Query, Result<Activity>>
    {
        public async Task<Result<Activity>> Handle(Query request, CancellationToken cancellationToken)
        {
            var activity = await context.Activities.FindAsync(request.Id, cancellationToken);

            if (activity == null)
                return Result<Activity>.Failure("Activity not found!!", (int)HttpStatusCode.NotFound);

            return Result<Activity>.Success(activity);
        }
    }
}