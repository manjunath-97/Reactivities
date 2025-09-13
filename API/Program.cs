using API.MiddleWares;
using API.SignalR;
using Application.Activities.Queries;
using Application.Activities.validators;
using Application.Core;
using Application.Interfaces;
using Domain;
using FluentValidation;
using Infrastructure.Photos;
using Infrastructure.Security;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Net;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddDbContext<AppDBContext>( opt => {
    opt.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
   });

builder.Services.AddSignalR();
builder.Services.AddCors();
builder.Services.AddMediatR(x =>
{
    x.RegisterServicesFromAssemblyContaining<GetActivityList.Handler>();
    x.AddOpenBehavior(typeof(ValidationBehaviour<,>));
});
builder.Services.AddAutoMapper(typeof(MappingProfiles).Assembly);
builder.Services.AddValidatorsFromAssemblyContaining<Application.Activities.validators.CreateActivityValidator>();
builder.Services.AddValidatorsFromAssemblyContaining<Application.Activities.validators.EditActivityValidator>();
builder.Services.AddTransient<ExceptionMiddleware>();
builder.Services.AddIdentityApiEndpoints<User>(opt =>
{
    opt.User.RequireUniqueEmail = true;
    opt.SignIn.RequireConfirmedEmail = false;
})
.AddRoles<IdentityRole>() 
.AddEntityFrameworkStores<AppDBContext>();

builder.Services.AddScoped<IUserAccessor, UserAccessor>();
builder.Services.AddScoped<IPhotoService, PhotoService>();

builder.Services.AddAuthorization(opt =>
{
    opt.AddPolicy("IsActivityHost", policy =>
    {
        policy.Requirements.Add(new IsHostRequirement());
    });
});
builder.Services.AddTransient<IAuthorizationHandler, IsHostRequirementHandler>();

builder.Services.Configure<CloudinarySettings>(builder.Configuration.GetSection("CloudinarySettings"));
var app = builder.Build();

app.UseMiddleware<ExceptionMiddleware>();
app.UseCors(x => x.
AllowAnyHeader().
AllowAnyMethod().
AllowCredentials().
WithOrigins("http://localhost:3000", "https://localhost:3000"));

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();
app.MapGroup("api").MapIdentityApi<User>(); // api/login
app.MapHub<CommentHub>("/comments");

using var scope = app.Services.CreateScope();
var services = scope.ServiceProvider;

try
{
    var context = services.GetRequiredService<AppDBContext>();
    var userManager = services.GetRequiredService<UserManager<User>>();

    await context.Database.MigrateAsync();
    await DBInitialiser.SeedData(context, userManager);
}
catch (Exception ex)
{
    var logger = services.GetRequiredService<ILogger<Program>>();
    logger.LogError(ex, "An error occurred during migration");
}

app.Run();
