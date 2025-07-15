using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Security;

public class IsHostRequirement : IAuthorizationRequirement
{

}

public class IsHostRequirementHandler(AppDBContext dBContext, IHttpContextAccessor httpContextAccessor)
    : AuthorizationHandler<IsHostRequirement>
{
    protected override async Task HandleRequirementAsync(AuthorizationHandlerContext context, IsHostRequirement requirement)
    {
        var userid = context.User.FindFirstValue(ClaimTypes.NameIdentifier);

        if (userid == null) return;

        var httpCntxt = httpContextAccessor.HttpContext;
        if (httpCntxt?.GetRouteValue("id") is not string activityId) return;

        var Attendee = dBContext.ActivityAttendee
            .AsNoTracking()
            .SingleOrDefault(r => r.UserId == userid && r.ActivityId == activityId);

        if (Attendee==null ) return;

        if (!Attendee.IsHost) return;

        if(Attendee.IsHost)
        {
            context.Succeed(requirement);
        }
    }
}
