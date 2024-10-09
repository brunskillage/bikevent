using Bikevent.Database.TableObjects;

namespace Bikevent.Website.Models;

public class RidesPageModel : BasePageModel
{
    public IEnumerable<BvRideRow> Rides { get; set; }
}