using Application.Core;
using FluentValidation;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

namespace API.MiddleWares
{
    public class ExceptionMiddleware(ILogger<ExceptionMiddleware> logger, IHostEnvironment env) : IMiddleware
    {
        public async Task InvokeAsync(HttpContext context, RequestDelegate next)
        {
            try
            {
                await next(context);
            }
            catch (ValidationException ex)
            {
                await HandleValidationException(context, ex);
            }
            catch (Exception ex)
            {
                await HandleException(context, ex);
            }
        }

        private async Task HandleException(HttpContext context, Exception ex)
        {
            logger.LogError(ex,ex.Message);
            context.Response.ContentType = "application/json";
            context.Response.StatusCode = StatusCodes.Status500InternalServerError;

            var options = new JsonSerializerOptions()
            {
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
            };

            var appException = env.IsDevelopment()? (new AppException(ex.Message, ex.StackTrace, 500)): 
                                (new AppException(ex.Message, null, 500));

            var json = JsonSerializer.Serialize(appException, options);

            await context.Response.WriteAsync(json);
        }

        private async Task HandleValidationException(HttpContext context, ValidationException ex)
        {
            Dictionary<string, string[]> validationErrors = new Dictionary<string, string[]>();

            if(ex.Errors is not null)
            {
                foreach (var error in ex.Errors)
                {
                    if (validationErrors.TryGetValue(error.PropertyName, out var ExistingErrors))
                    {
                        validationErrors[error.PropertyName] = validationErrors[error.PropertyName].Append(error.ErrorMessage).ToArray();
                    }
                    else
                    {
                        validationErrors.Add(error.PropertyName, new[] { error.ErrorMessage });
                    }
                }
            }

            context.Response.StatusCode = 400;

            var validationProblemDetails = new ValidationProblemDetails
            {
                Title = "Validation Error",
                Status = StatusCodes.Status400BadRequest,
                Errors = validationErrors,
                Type = "ValidationFailure",
                Detail= "One or more validation errors occurred."
            };

            await context.Response.WriteAsJsonAsync(validationProblemDetails);
        }


    }
}
