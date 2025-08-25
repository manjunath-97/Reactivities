using Application.Core;
using Application.Interfaces;
using MediatR;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Profiles.commands
{
    public class SetMainPhoto
    {
        public class Command : IRequest<Result<Unit>>
        {
            public required string PhotoId;
        }

        public class RequestHandler(
            AppDBContext dBContext, 
            IUserAccessor userAccessor
        ) 
            : IRequestHandler<Command, Result<Unit>>
        {
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await userAccessor.GetUserWithPhotosAsync();

                var Photo = user.Photos.FirstOrDefault(p => p.Id.ToString() == request.PhotoId);

                if (Photo == null)
                {
                    return Result<Unit>.Failure("Cannot Find the photo", 400);
                }

                user.ImageUrl = Photo.Url;

                var res = await dBContext.SaveChangesAsync()>0;

                return (res) ? Result<Unit>.Success(Unit.Value) : Result<Unit>.Failure("Problem updating photo", 400);
            }
        }

    }
}
