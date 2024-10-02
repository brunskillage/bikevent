namespace Bikevent.Website.Models;

public class EventsPageModel : BasePageModel
{
    public IEnumerable<BvEventRow> Events { get; set; }
}