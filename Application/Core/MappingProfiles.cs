using Application.Activities.DTOs;
using Application.Profiles.DTOs;
using AutoMapper;
using Domain;
using System;

namespace Application.Core;

public class MappingProfiles : Profile
{
    public MappingProfiles()
    {
        CreateMap<CreateActivityDTO, Activity>();
        CreateMap<EditActivityDto, Activity>();

        CreateMap<Activity, ActivityDto>()
            .ForMember(d => d.HostDisplayName, o => o.MapFrom(s => s.Attendees.FirstOrDefault(x => x.IsHost)!.User.DisplayName))
            .ForMember(d => d.HostId, o => o.MapFrom(s => s.Attendees.FirstOrDefault(x => x.IsHost)!.User.Id));

        CreateMap<ActivityAttendee, UserProfile>()
            .ForMember(d => d.DisplayName, x => x.MapFrom(s => s.User.DisplayName))
            .ForMember(d => d.Bio, x => x.MapFrom(s => s.User.Bio))
            .ForMember(d => d.ImageUrl, x => x.MapFrom(s => s.User.ImageUrl))
            .ForMember(d => d.Id, x => x.MapFrom(s => s.User.Id));
    }
}
