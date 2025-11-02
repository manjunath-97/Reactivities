using Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;
using Application.Activities.Queries;
using Application.Activities.Commands;
using Application.Activities.DTOs;
using Microsoft.AspNetCore.Authorization;
using Application.Activities.commands;
using Application.Core;

namespace API.Controllers
{
    public class ActivitiesController : BaseAPIController
    {
        [Authorize]
        [HttpGet]
        public async Task<ActionResult<PagedList<ActivityDto,DateTime?>>> GetActivities([FromQuery]ActivityParams activityParams)
        {
            return HandleResult(await Mediator.Send(new GetActivityList.Query { activityParams = activityParams }));
        }

        [Authorize]
        [HttpGet("{id}")]
        public async Task<ActionResult<ActivityDto>> GetActivity(string id)
        {
            return HandleResult(await Mediator.Send(new GetActivityDetails.Query { Id = id }));        
        }   

        [HttpPost]
        public async Task<ActionResult<string>> CreateActivity(CreateActivityDTO activityDto)
        {
            return HandleResult(await Mediator.Send(new CreateActivty.Command { activityDto = activityDto }));
        }

        [HttpPut("{id}")]
        [Authorize(Policy = "IsActivityHost")]
        public async Task<ActionResult> EditActivity(string id, EditActivityDto activityDto)
        {
            activityDto.Id = id;
            return HandleResult(await Mediator.Send(new EditActivity.Command { activityDto = activityDto }));
        }

        [HttpDelete("{id}")]
        [Authorize(Policy = "IsActivityHost")]
        public async Task<ActionResult> DeleteActivity(string id)
        {
            return HandleResult(await Mediator.Send(new DeleteActivity.Command { Id = id }));
        }

        [HttpPost("{id}/attend")]
        public async Task<ActionResult<string>> Attend(string id)
        {
            return HandleResult(await Mediator.Send(new UpdateAttendance.Command { Id = id}));
        }
    }
}
