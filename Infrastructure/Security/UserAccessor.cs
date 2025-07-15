using Application.Interfaces;
using Domain;
using Microsoft.AspNetCore.Http;
using Persistence;
using System.Security.Claims;

namespace Infrastructure.Security;

public class UserAccessor(IHttpContextAccessor httpContextAccessor, AppDBContext appDBContext) 
    : IUserAccessor
{
    public async Task<User> GetUserAsync()
    {
        return await appDBContext.Users.FindAsync(GetUserID()) 
            ?? throw new Exception("No user is logged in");
    }

    public string GetUserID()
    {
        return httpContextAccessor.HttpContext?.User.FindFirstValue(ClaimTypes.NameIdentifier)
            ?? throw new Exception("No user found!");
    }
}
