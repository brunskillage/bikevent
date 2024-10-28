using Dapper.Contrib.Extensions;

namespace Bikevent.Database.TableObjects;
[Table("VersionInfo")]
public class BvVersioninfoRow
{
    [Key]
    public int Id { get; set; }
    public DateTime? AppliedOn { get; set; }
    public string? Description { get; set; }
    public int Version { get; set; }
}

[Table("clubs")]
public class BvClubRow
{
    [Key]
    public int Id { get; set; }
    public int CreatedById { get; set; }
    public DateTime? CreatedOn { get; set; }
    public string Email { get; set; }
    public string? GoogleMapUrl { get; set; }
    public string? MainImageUrl { get; set; }
    public DateTime? ModifiedOn { get; set; }
    public string NameOf { get; set; }
    public string? President { get; set; }
    public string? WebsiteUrl { get; set; }
    public int RegionId { get; set; }
}

[Table("events")]
public class BvEventRow
{
    [Key]
    public int Id { get; set; }
    public int ClubId { get; set; }
    public int CreatedById { get; set; }
    public DateTime? CreatedOn { get; set; }
    public string Description { get; set; }
    public DateTime? EndsOn { get; set; }
    public decimal? Lat { get; set; }
    public string? LinklUrl { get; set; }
    public decimal? Lng { get; set; }
    public DateTime? ModifiedOn { get; set; }
    public DateTime? StandsUp { get; set; }
    public string Title { get; set; }
}

[Table("rides")]
public class BvRideRow
{
    [Key]
    public int Id { get; set; }
    public int ClubId { get; set; }
    public int CreatedById { get; set; }
    public DateTime? CreatedOn { get; set; }
    public string? Description { get; set; }
    public string? EndLocation { get; set; }
    public DateTime? EndsOn { get; set; }
    public decimal? Lat { get; set; }
    public string? LinklUrl { get; set; }
    public decimal? Lng { get; set; }
    public string? MapLink { get; set; }
    public DateTime? ModifiedOn { get; set; }
    public string StartLocation { get; set; }
    public DateTime? StartsOn { get; set; }
    public string Title { get; set; }
}

[Table("userClubs")]
public class BvUserclubRow
{
    [Key]
    public int Id { get; set; }
    public int ClubId { get; set; }
    public DateTime? CreatedOn { get; set; }
    public DateTime? ModifiedOn { get; set; }
}

[Table("users")]
public class BvUserRow
{
    [Key]
    public int Id { get; set; }
    public DateTime? CreatedOn { get; set; }
    public string Email { get; set; }
    public string? EncPassword { get; set; }
    public DateTime? ModifiedOn { get; set; }
    public string NickName { get; set; }
    public DateTime? VerifiedOn { get; set; }
}