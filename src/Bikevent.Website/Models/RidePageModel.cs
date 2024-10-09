using Bikevent.Database.TableObjects;

namespace Bikevent.Website.Models;

public class RidePageModel : BasePageModel
{
    public BvRideRow RideItem { get; set; }
}