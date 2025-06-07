﻿using Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;
using Application.Activities.Queries;
using Application.Activities.Commands;
using Application.Activities.DTOs;

namespace API.Controllers
{
    public class ActivitiesController : BaseAPIController
    {
        [HttpGet]
        public async Task<ActionResult<List<Activity>>> GetActivities()
        {
            return await Mediator.Send(new GetActivityList.Query());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Activity>> GetActivity(string id)
        {
            return await Mediator.Send(new GetActivityDetails.Query { Id = id });
        }

        [HttpPost]
        public async Task<ActionResult<string>> CreateActivity(CreateActivityDTO activityDto)
        {
            return await Mediator.Send(new CreateActivty.Command { ActivityDto = activityDto });
        }

        [HttpPut]
        public async Task<ActionResult> EditActivity(Activity activity)
        {
            await Mediator.Send(new EditActivty.Command { Activity = activity });

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteActivity(string id)
        {
            await Mediator.Send(new DeleteActivity.Command { Id = id });
            return Ok();
        }
    }
}
