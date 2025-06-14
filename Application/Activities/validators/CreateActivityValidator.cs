using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Application.Activities.Commands;
using Application.Activities.DTOs;
using FluentValidation;

namespace Application.Activities.validators
{
    public class CreateActivityValidator : BaseActivityValidator<CreateActivty.Command, CreateActivityDTO>
    {
        public CreateActivityValidator() : base( x=>x.activityDto)
        {
        }
    }
}
