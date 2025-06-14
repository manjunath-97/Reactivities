using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;
using AutoMapper;
using Application.Core;
using Application.Activities.DTOs;

namespace Application.Activities.Commands;

public class EditActivity
{
    public class Command() : IRequest<Result<Unit>>
    {
        public required EditActivityDto activityDto { get; set; }
    }

    public class Handler(AppDBContext context, IMapper mapper) : IRequestHandler<Command, Result<Unit>>
    {
        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            var activity = await context.Activities.FindAsync([request.activityDto.Id], cancellationToken);

            if (activity is null)
            {
                return Result<Unit>.Failure("Activity not found!", 404);
            }

            mapper.Map(request.activityDto, activity);

            var result = await context.SaveChangesAsync(cancellationToken) > 0;

            if (!result)
                return Result<Unit>.Failure("Failed to update activity", 400);

            return Result<Unit>.Success(Unit.Value);
        }
    }
}
