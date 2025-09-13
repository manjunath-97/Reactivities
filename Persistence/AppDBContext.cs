using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace Persistence;

public class AppDBContext(DbContextOptions dbContextOptions) : IdentityDbContext<User>(dbContextOptions)
{
    public required DbSet<Activity> Activities { get; set; }

    public required DbSet<ActivityAttendee> ActivityAttendee { get; set; }

    public required DbSet<Photo> Photos { get; set; }

    public required DbSet<Comment> Comments { get; set; }

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

        var dateTimeConverter = new ValueConverter<DateTime, DateTime>(
            v => v.ToUniversalTime(),
            v => DateTime.SpecifyKind(v, DateTimeKind.Utc)
        );

        foreach (var entityType in builder.Model.GetEntityTypes())
        {
            foreach (var property in entityType.GetProperties())
            {
                if (property.ClrType == typeof(DateTime))
                {
                    property.SetValueConverter(dateTimeConverter);
                }
            }
        }
    }
}

