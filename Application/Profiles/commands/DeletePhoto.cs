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
    public class DeletePhoto
    {
        public class Command : IRequest<Result<Unit>>
        {
            public required string PhotoId;
        }

        public class RequestHandler(
            AppDBContext dBContext, 
            IUserAccessor userAccessor, 
            IPhotoService photoService
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

                if (Photo.Url == user.ImageUrl)
                {
                    return Result<Unit>.Failure("Cannot Delete Main photo", 400);
                }

                await photoService.DeletePhoto(Photo.PublicId);

                dBContext.Photos.Remove(Photo);

                var res = await dBContext.SaveChangesAsync()>0;

                return (res) ? Result<Unit>.Success(Unit.Value) : Result<Unit>.Failure("Problem Deleting photo", 400);
            }
        }

    }
}
