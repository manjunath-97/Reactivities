using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities.Commands;

public class DeleteActivity
{
	public class Command() : IRequest 
	{
		public required string Id { get; set; }
	}

    public class Handler(AppDBContext context) : IRequestHandler<Command>
    {
        public async Task Handle(Command request, CancellationToken cancellationToken)
        {
            var activity = await context.Activities.FindAsync([request.Id],cancellationToken)
                ??throw new Exception("Activity Not found!!");

            context.Activities.Remove(activity);

            await context.SaveChangesAsync(cancellationToken);
        }
    }
}
