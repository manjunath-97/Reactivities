using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities.Commands;

public class CreateActivty
{
	public class Command() : IRequest<string> 
	{
		public required Activity Activity { get; set; }
	}

    public class Handler(AppDBContext context) : IRequestHandler<Command, string>
    {
        public async Task<string> Handle(Command request, CancellationToken cancellationToken)
        {
            context.Activities.Add(request.Activity);

            var result = await context.SaveChangesAsync(cancellationToken);

            return request.Activity.Id;
        }
    }
}
