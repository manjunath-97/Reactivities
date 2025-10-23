﻿using Microsoft.AspNetCore.Identity;

namespace Domain;

public class User : IdentityUser
{
    public string? DisplayName { get; set; }
    public string? Bio { get; set; }
    public string? ImageUrl { get; set; }

    //Nav properties

    public ICollection<ActivityAttendee> Attendees { get; set; } = [];
    public ICollection<Photo> Photos { get; set; } = [];

    public ICollection<UserFollowing> Followings { get; set; } = [];

    public ICollection<UserFollowing> Followers { get; set; } = [];

}
