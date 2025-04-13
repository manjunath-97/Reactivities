using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;
using AutoMapper;

namespace Application.Activities.Commands;

public class EditActivty
{
    public class Command() : IRequest
    {
        public required Activity Activity { get; set; }
    }

    public class Handler(AppDBContext context, IMapper mapper) : IRequestHandler<Command>
    {
        public async Task Handle(Command request, CancellationToken cancellationToken)
        {
            var activity = await context.Activities.FindAsync([request.Activity.Id], cancellationToken) ?? throw new Exception("Activity not found!!");

            mapper.Map(request.Activity, activity);

            var result = await context.SaveChangesAsync(cancellationToken);
        }
    }
}
