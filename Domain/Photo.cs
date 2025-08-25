using Microsoft.AspNetCore.Identity;
using System.Text.Json.Serialization;

namespace Domain;

public class Photo
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public required string Url { get; set; }
    public required string PublicId { get; set; }

    //Nav Properties
    public required string UserID { get; set; }

    [JsonIgnore]
    public User User { get; set; } = null!;
}
