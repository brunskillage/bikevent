namespace Bikevent.Website.Models;

public class ClubsPageModel : BasePageModel
{
    public string NameOf { get; set; }
    public IEnumerable<BvClubRow> ClubRows { get; set; }
}