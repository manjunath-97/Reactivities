﻿using Application.Activities.DTOs;
using AutoMapper;
using Domain;
using System;

namespace Application.Core;

public class MappingProfiles : Profile
{
    public MappingProfiles()
    {
        CreateMap<Activity, Activity>();
        CreateMap<CreateActivityDTO, Activity>();
        CreateMap<EditActivityDto, Activity>();
    }
}
