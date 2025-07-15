using Application.Activities.DTOs;
using Application.Core;
using Application.Interfaces;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Activities.Commands;

public class CreateActivty
{
	public class Command() : IRequest<Result<string>> 
	{
		public required CreateActivityDTO activityDto { get; set; }
	}

    public class Handler(AppDBContext context, IMapper mapper, IUserAccessor userAccessor) : IRequestHandler<Command, Result<string>>
    {
        public async Task<Result<string>> Handle(Command request, CancellationToken cancellationToken)
        {
            var activity = mapper.Map<Activity>(request.activityDto);

            context.Activities.Add(activity);

            var User = await userAccessor.GetUserAsync();

            ActivityAttendee activityAttendee = new ActivityAttendee()
            {
                ActivityId = activity.Id,
                UserId = User.Id,
                IsHost = true
            };

            context.ActivityAttendee.Add(activityAttendee);

            var result = await context.SaveChangesAsync(cancellationToken)>0;

            if (!result)
                return Result<string>.Failure("Failed to create activity", 400);

            return Result<string>.Success(activity.Id);
        }
    }
}
