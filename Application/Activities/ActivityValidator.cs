using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Application.Activities.Commands;
using Application.Activities.DTOs;
using FluentValidation;

namespace Application.Activities
{
    public class ActivityValidator : AbstractValidator<CreateActivty.Command>
    {
        public ActivityValidator() {

            RuleFor(x => x.ActivityDto.Title).NotEmpty().WithMessage("Title is needed!");
            RuleFor(x => x.ActivityDto.Description).NotEmpty().WithMessage("Description is needed!");

        }
    }
}
