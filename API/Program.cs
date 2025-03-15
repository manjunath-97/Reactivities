using Microsoft.EntityFrameworkCore;
using Persistence;
using System;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddDbContext<AppDBContext>( opt => {
    opt.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
   });
var app = builder.Build();

app.MapControllers();


using var scope = app.Services.CreateScope();
var services = scope.ServiceProvider;

try
{
    var context = services.GetRequiredService<AppDBContext>();
    await context.Database.MigrateAsync();
    await DBInitialiser.SeedData(context);
}
catch (Exception ex)
{
    var logger = services.GetRequiredService<ILogger<Program>>();
    logger.LogError(ex, "An error occurred during migration");
}

app.Run();
