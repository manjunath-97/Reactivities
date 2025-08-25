using Application.Core;
using Application.Profiles.commands;
using Application.Profiles.queries;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    
    public class ProfilesController : BaseAPIController
    {
        [HttpPost("add-photo")]
        public async Task<ActionResult<Photo>> AddPhoto(IFormFile file)
        {
            return HandleResult(await Mediator.Send(new AddPhoto.Command { File = file }));
        }

        [HttpGet("{UserId}/photos")]
        public async Task<ActionResult<List<Photo>>> GetPhotos(string UserId)
        {
            return HandleResult(await Mediator.Send(new GetPhotos.Query { UserID = UserId }));
        }

        [HttpDelete("{PhotoId}/photos")]
        public async Task<ActionResult> DeletePhoto(string PhotoId)
        {
            return HandleResult(await Mediator.Send(new DeletePhoto.Command { PhotoId = PhotoId }));
        }

        [HttpPut("{PhotoId}/setMain")]
        public async Task<ActionResult> SetMainPhoto(string PhotoId)
        {
            return HandleResult(await Mediator.Send(new SetMainPhoto.Command { PhotoId = PhotoId }));
        }
    }
}
