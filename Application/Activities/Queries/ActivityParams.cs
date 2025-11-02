using System;
using Application.Core;

public class ActivityParams : PaginationParams<DateTime?>
{
    public string? Filter { get; set; }

    public required DateTime StartDate { get; set; } = DateTime.UtcNow;
}
