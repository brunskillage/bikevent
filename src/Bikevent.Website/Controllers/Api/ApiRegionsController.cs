using Bikevent.Database;
using Bikevent.Database.TableObjects;
using Bikevent.DataObjects;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Bikevent.Website.Controllers.Api;

[ApiController]
[Route("api/v1")]
public class ApiRegionsController : ControllerBase
{
    private readonly RegionDbService _regionDbService;

    public ApiRegionsController(RegionDbService regionDbService)
    {
        _regionDbService = regionDbService;
    }

    [Route("regions")]
    [HttpGet]
    public async Task<ActionResult<bvRegionRow>> GetRegions()
    {
        return Ok(new BvResponse
        {
            Data = new
            {
                regions = _regionDbService.GetRegions()
            }
        });
    }
}