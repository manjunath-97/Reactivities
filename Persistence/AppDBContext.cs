using Microsoft.EntityFrameworkCore;
using Domain;

namespace Persistence;

public class AppDBContext(DbContextOptions dbContextOptions) : DbContext(dbContextOptions)
{
    public required DbSet<Activity> Activities { get; set; }
}

