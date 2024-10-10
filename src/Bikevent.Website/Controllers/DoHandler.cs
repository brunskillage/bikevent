using Bikevent.Database;
using Bikevent.DataObjects;

namespace Bikevent.Website.Controllers;

public class DoHandler
{
    private readonly ClubDbService _clubDbService;
    private readonly RidesDbService _rides;
    private readonly EventsDbService _eventsDbService;

    public DoHandler(ClubDbService clubDbService, RidesDbService rides, EventsDbService eventsDbService)
    {
        _clubDbService = clubDbService;
        _rides = rides;
        _eventsDbService = eventsDbService;
    }

    public async Task<BvResponse> GetClubs(dynamic args)
    {
        return new BvResponse
        {
            Data = new
            {
                clubs = await _clubDbService.GetClubs()
            }
        };
    }
}