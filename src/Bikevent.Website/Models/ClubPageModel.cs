namespace Bikevent.Website.Models;

public class ClubPageModel : BasePageModel
{
    public string NameOf { get; set; }
    public BvClubRow Club { get; set; }
}