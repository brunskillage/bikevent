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

    [Route("rides")]
    [HttpGet]
    public async Task<ActionResult<BvResponse>> GetClubs()
    {
        var clubs = await _ridesDbService.GetRides();
        return Ok(
            new BvResponse
            {
                Data = new
                {
                    clubs = clubs.ToList()
                }
            });
    }
}