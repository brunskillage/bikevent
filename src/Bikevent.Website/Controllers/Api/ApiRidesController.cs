using System.Net.Mime;
using Bikevent.Database;
using Bikevent.Database.TableObjects;
using Bikevent.DataObjects;
using Bikevent.Validation;
using Bikevent.Website.wwwroot;
using Microsoft.AspNetCore.Mvc;

namespace Bikevent.Website.Controllers.Api;

[ApiController]
[Produces(MediaTypeNames.Application.Json)]
[Route("api/v1")]
public class ApiRidesController : Controller
{
    private readonly RidesDbService _ridesDbService;

    public ApiRidesController(RidesDbService ridesDbService)
    {
        _ridesDbService = ridesDbService;
    }

    [Route("ride")]
    [HttpPost]
    public async Task<ActionResult<BvClubRow>> AddRide([FromBody] BvRideRow ride)
    {
        var v = new RideValidator();
        var res = await v.ValidateAsync(ride);
        if (!res.IsValid)
            return Ok(res.ToBvResponse());

        var id = await _ridesDbService.AddRide(ride);
        return Ok(new BvResponse { Data = new { id } });
    }
}