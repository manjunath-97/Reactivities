using Application.Activities.DTOs;
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
	public class Command() : IRequest<string> 
	{
		public required CreateActivityDTO ActivityDto { get; set; }
	}

    public class Handler(AppDBContext context, IMapper mapper, IValidator<Command> validator) : IRequestHandler<Command, string>
    {
        public async Task<string> Handle(Command request, CancellationToken cancellationToken)
        {

            await validator.ValidateAndThrowAsync(request, cancellationToken);

            var activity = mapper.Map<Activity>(request.ActivityDto);

            context.Activities.Add(activity);

            var result = await context.SaveChangesAsync(cancellationToken);

            return activity.Id;
        }
    }
}
