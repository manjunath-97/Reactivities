using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Profiles.queries
{
    public class GetPhotos
    {
        public class Query : IRequest<Result<List<Photo>>>
        {
            public required string UserID;
        }

        // Pseudocode:
        // - Receive a Query with UserID.
        // - Query Users where Id == UserID and select all related Photos.
        // - Await the list asynchronously.
        // - Return a successful Result with the photos.
        // - Fix: Use the static factory Result<T>.Success(...) instead of 'new Result<T>.Success(...)'.

        public class RequestHandle(AppDBContext dBContext) : IRequestHandler<Query, Result<List<Photo>>>
        {
            public async Task<Result<List<Photo>>> Handle(Query req, CancellationToken cancellationToken)
            {
                var photos = await dBContext.Users
                    .Where(u => u.Id == req.UserID)
                    .SelectMany(u => u.Photos)
                    .ToListAsync(cancellationToken);

                return Result<List<Photo>>.Success(photos);
            }
        }
    }
}
