using Microsoft.EntityFrameworkCore;
using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace Persistence;

public class AppDBContext(DbContextOptions dbContextOptions) : IdentityDbContext<User>(dbContextOptions)
{
    public required DbSet<Activity> Activities { get; set; }

    public required DbSet<ActivityAttendee> ActivityAttendee { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        builder.Entity<ActivityAttendee>(x => x.HasKey(x => new { x.UserId, x.ActivityId }));

        builder.Entity<ActivityAttendee>()
            .HasOne(x => x.User)
            .WithMany(x => x.Attendees)
            .HasForeignKey(x => x.UserId);

        builder.Entity<ActivityAttendee>()
            .HasOne(x => x.Activity)
            .WithMany(x => x.Attendees)
            .HasForeignKey(x => x.ActivityId);
    }
}

