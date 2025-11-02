using Application.Core;
using Application.Profiles.commands;
using Application.Profiles.DTOs;
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

        [HttpGet("{userId}/photos")]
        public async Task<ActionResult<List<Photo>>> GetPhotos(string userId)
        {
            return HandleResult(await Mediator.Send(new GetPhotos.Query { UserID = userId }));
        }

        [HttpDelete("{photoId}/photos")]
        public async Task<ActionResult> DeletePhoto(string photoId)
        {
            return HandleResult(await Mediator.Send(new DeletePhoto.Command { PhotoId = photoId }));
        }

        [HttpPut("{photoId}/setMain")]
        public async Task<ActionResult> SetMainPhoto(string photoId)
        {
            return HandleResult(await Mediator.Send(new SetMainPhoto.Command { PhotoId = photoId }));
        }

        [HttpGet("{userId}")]
        public async Task<ActionResult<UserProfile>> GetProfile(string userId)
        {
            return HandleResult(await Mediator.Send(new GetProfile.Query { UserID = userId }));
        }

        [HttpPost("{userId}/follow")]
        public async Task<ActionResult<UserProfile>> FollowToggle(string userId)
        {
            return HandleResult(await Mediator.Send(new FollowToggle.Command { TargetUserId = userId }));
        }

        [HttpGet("{userId}/follow-list")]
        public async Task<ActionResult<UserProfile>> GetFollowings(string userId, string predicate)
        {
            return HandleResult(await Mediator.Send(new GetFollowings.Query { UserId = userId, Predicate = predicate }));
        }

        [HttpGet("{userId}/activities")]
        public async Task<ActionResult<List<UserActivityDto>>> GetUserActivities(string userId, string filter)
        {
            return HandleResult(await Mediator.Send(new GetUserActivities.Query { UserId = userId, Filter = filter }));
        }
    }
}
