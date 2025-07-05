using Microsoft.EntityFrameworkCore;
using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace Persistence;

public class AppDBContext(DbContextOptions dbContextOptions) : IdentityDbContext<User>(dbContextOptions)
{
    public required DbSet<Activity> Activities { get; set; }
}

