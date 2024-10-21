using System.Net.Mime;
using Bikevent.Database;
using Bikevent.Database.TableObjects;
using Bikevent.DataObjects;
using Bikevent.Validation;
using Bikevent.Website.wwwroot;
using Microsoft.AspNetCore.Mvc;
using FluentValidation;
using FluentValidation.Results;

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
    public async Task<ActionResult<BvResponse>> GetRides()
    {
        var rides = await _ridesDbService.GetRides();
        return Ok(
            new BvResponse
            {
                Data = new
                {
                    rides
                }
            });
    }

    [Route("ride")]
    [HttpPost]
    public async Task<ActionResult<BvRideRow>> AddRide(BvRideRow ride)
    {
        var v = new RideValidator(_ridesDbService);
        var res = await v.ValidateAsync(ride, options => options.IncludeRuleSets("Add").IncludeRulesNotInRuleSet());
        if (!res.IsValid)
            return Ok(res.ToBvResponse());

        var id = await _ridesDbService.AddRide(ride);
        return Ok(new BvResponse { Data = new { id } });
    }

    [Route("ride")]
    [HttpPatch]
    public async Task<ActionResult<BvRideRow>> UpdateRide([FromBody] BvRideRow ride)
    {

        var v = new RideValidator(_ridesDbService);
        var res = await v.ValidateAsync(ride, options => options.IncludeRuleSets("Update").IncludeRulesNotInRuleSet());
        if (!res.IsValid)
            return Ok(res.ToBvResponse());

        var id = await _ridesDbService.UpdateRide(ride);
        return Ok(new BvResponse { Data = new { id } });
    }

    [Route("ride/{id}")]
    [HttpDelete]
    public async Task<ActionResult<BvRideRow>> DeleteRide([FromRoute] int id, bool confirmed = false)
    {
        if (!confirmed)
        {
            return Ok(new ValidationResult(new List<ValidationFailure>
                { new("confirmed", "You must confirm deletion or all removal.") }).ToBvResponse());
        }
        await _ridesDbService.DeleteRide(new BvRideRow { Id = id });
        return Ok();
    }

    [Route("ride/{id}")]
    [HttpGet]
    public async Task<ActionResult<BvRideRow>> GetRide([FromRoute] int id)
    {
        var Ride = await _ridesDbService.GetRideById(new BvRideRow { Id = id });
        return Ok(new BvResponse
        {
            Data = new { Ride }
        });
    }
}