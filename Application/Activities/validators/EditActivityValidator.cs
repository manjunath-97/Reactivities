using Application.Activities.Commands;
using Application.Activities.DTOs;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Activities.validators
{
    public class EditActivityValidator : BaseActivityValidator<EditActivity.Command, EditActivityDto>
    {
        public EditActivityValidator() : base(x => x.activityDto)
        {
            RuleFor(x => x.activityDto.Id)
                .NotEmpty().WithMessage("ID is needed!");
        }
    }
}
