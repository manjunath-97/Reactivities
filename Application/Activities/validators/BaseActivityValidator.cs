using Application.Activities.DTOs;
using FluentValidation;

namespace Application.Activities.validators
{
    public class BaseActivityValidator<T, TDto> : AbstractValidator<T> 
        where TDto : BaseActivityDto
    {
        public BaseActivityValidator(Func<T, TDto> selector)
        {
            RuleFor(x => selector(x).Title)
                .NotEmpty().WithMessage("Title is needed!")
                .MaximumLength(100).WithMessage("Titles should not exceed the length of 100;");

            RuleFor(x => selector(x).Description)
                .NotEmpty().WithMessage("Description is needed!");

            RuleFor(x => selector(x).Category)
                .NotEmpty().WithMessage("Category is needed!");

            RuleFor(x => selector(x).Date)
                .GreaterThan(DateTime.UtcNow).WithMessage("Date should be in the future!");

            RuleFor(x => selector(x).City)
                .NotEmpty().WithMessage("City is needed!");

            RuleFor(x => selector(x).Venue)
                .NotEmpty().WithMessage("Venue is needed!")
                .MaximumLength(100).WithMessage("Venues should not exceed the lenght of 100;");

            RuleFor(x => selector(x).Latitude)
                .NotEmpty().WithMessage("Latitude is needed!")
                .InclusiveBetween(-90, 90).WithMessage("Latitude should be between -90 to 90");

            RuleFor(x => selector(x).Longitude)
                .NotEmpty().WithMessage("Longitude is needed!")
                .InclusiveBetween(-180, 180).WithMessage("Longitude should be between -180 to 180");

        }
    }
}
