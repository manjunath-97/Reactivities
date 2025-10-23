﻿using Application.Activities.DTOs;
using Application.Interfaces;
using Application.Profiles.DTOs;
using AutoMapper;
using Domain;
using System;

namespace Application.Core;

public class MappingProfiles : Profile
{
    public MappingProfiles()
    {
        string? currentUserId = null;
        CreateMap<CreateActivityDTO, Activity>();
        CreateMap<EditActivityDto, Activity>();

        CreateMap<Activity, ActivityDto>()
            .ForMember(d => d.HostDisplayName, o => o.MapFrom(s => s.Attendees.FirstOrDefault(x => x.IsHost)!.User.DisplayName))
            .ForMember(d => d.HostId, o => o.MapFrom(s => s.Attendees.FirstOrDefault(x => x.IsHost)!.User.Id));

        CreateMap<ActivityAttendee, UserProfile>()
            .ForMember(d => d.DisplayName, x => x.MapFrom(s => s.User.DisplayName))
            .ForMember(d => d.Bio, x => x.MapFrom(s => s.User.Bio))
            .ForMember(d => d.ImageUrl, x => x.MapFrom(s => s.User.ImageUrl))
            .ForMember(d => d.Id, x => x.MapFrom(s => s.User.Id))
            .ForMember(d => d.FollowersCount, o => o.MapFrom(s => s.User.Followers.Count))
            .ForMember(d => d.FollowingCount, o => o.MapFrom(s => s.User.Followings.Count))
            .ForMember(d => d.Following, o => o.MapFrom(s =>
                            s.User.Followers.Any(x => x.Observer.Id == currentUserId)));

        CreateMap<User, UserProfile>()
            .ForMember(d => d.FollowersCount, o => o.MapFrom(s => s.Followers.Count))
            .ForMember(d => d.FollowingCount, o => o.MapFrom(s => s.Followings.Count))
            .ForMember(d => d.Following, o => o.MapFrom(s =>
                            s.Followers.Any(x => x.Observer.Id == currentUserId)));

        CreateMap<Comment, CommentDto>()
            .ForMember(d => d.UserId, x => x.MapFrom(s => s.User.Id))
            .ForMember(d => d.DisplayName, x => x.MapFrom(s => s.User.DisplayName))
            .ForMember(d => d.ImageUrl, x=>x.MapFrom(s => s.User.ImageUrl));
    }
}
