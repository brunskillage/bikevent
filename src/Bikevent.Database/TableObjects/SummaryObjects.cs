namespace Bikevent.Database.TableObjects;

public class RideCountByRegionRow
{
    public int RegionId { get; set; }
    public int CountOfRides { get; set; }
}

public class RideCountByClubRow
{
    public int ClubId { get; set; }
    public int ClubName { get; set; }
    public int CountOfRides { get; set; }
}

public class RidesByUserIdRow
{
    public int UserId { get; set; }
    public string Title { get; set; }
    public string NickName { get; set; }
    public string Email { get; set; }
    public string CreatedOn { get; set; }
}