using Bikevent.Database;
using Bikevent.DataObjects;

namespace Bikevent.Website.Controllers;

public class DoHandler
{
    private readonly ClubDbService _clubDbService;
    private readonly RidesDbService _rides;
    private readonly EventsDbService _eventsDbService;
    private readonly QueryDbService _queryDbService;

    public DoHandler(ClubDbService clubDbService, RidesDbService rides, EventsDbService eventsDbService, QueryDbService queryDbService)
    {
        _clubDbService = clubDbService;
        _rides = rides;
        _eventsDbService = eventsDbService;
        _queryDbService = queryDbService;
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

    public async Task<BvResponse> GetLatestRides(dynamic args) {
        return new BvResponse
        {
            Data = new { rides =  await _queryDbService.GetLatestRides() }
        };
    }
}