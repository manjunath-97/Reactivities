using Application.Activities.DTOs;
using Application.Core;
using Application.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Activities.commands;

public class UpdateAttendance
{
    public class Command : IRequest<Result<Unit>>
    {
        public required string Id { get; set; }
    }

    public class RequestHandler(AppDBContext dBContext, IUserAccessor userAccessor) : IRequestHandler<Command, Result<Unit>>
    {
        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
             var activity = await dBContext.Activities
                .Include(x => x.Attendees)
                .ThenInclude(x => x.User)
                .SingleOrDefaultAsync(x => x.Id == request.Id, cancellationToken);

            if (activity == null)
            {
                return Result<Unit>.Failure("Activity not found!", 404);
            }

            var user = await userAccessor.GetUserAsync();

            var attendance = activity.Attendees.FirstOrDefault(x => x.UserId == user.Id);
            var isHost = activity.Attendees.Any(x => x.IsHost && x.UserId == user.Id);

            if (attendance != null)
            {
                if (isHost)
                {
                    activity.IsCancelled = !activity.IsCancelled;
                }
                else
                {
                    activity.Attendees.Remove(attendance);
                }

            }
            else
            {
                activity.Attendees.Add(
                    new 
                    ActivityAttendee
                    {
                        UserId = user.Id,
                        IsHost = false,
                        ActivityId = request.Id
                    }
                );
            }

            var result = await dBContext.SaveChangesAsync(cancellationToken) > 0;

            return result ? Result<Unit>.Success(Unit.Value) : Result<Unit>.Failure("Activity not updated in DB", 400);
        }
    }
}
