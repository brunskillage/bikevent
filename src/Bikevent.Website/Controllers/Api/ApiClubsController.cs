using System.Net.Mime;
using Bikevent.Database;
using Bikevent.Database.TableObjects;
using Bikevent.DataObjects;
using Bikevent.Validation;
using Bikevent.Website.wwwroot;
using FluentValidation;
using FluentValidation.Results;
using Microsoft.AspNetCore.Mvc;

namespace Bikevent.Website.Controllers.Api;

[ApiController]
[Produces(MediaTypeNames.Application.Json)]
[Route("api/v1")]
public class ApiClubsController : Controller
{
    private readonly ClubDbService _clubDbService;
    private readonly RegionDbService _regionDbService;

    public ApiClubsController(ClubDbService clubDbService, RegionDbService regionDbService)
    {
        _clubDbService = clubDbService;
        _regionDbService = regionDbService;
    }

    [Route("clubs")]
    [HttpGet]
    public async Task<ActionResult<BvResponse>> GetClubs()
    {
        var clubs = await _clubDbService.GetClubs();

        var data = new { clubs = clubs.ToList() };

        return Ok(new BvResponse { Data = data });
    }

    [Route("club")]
    [HttpPost]
    public async Task<ActionResult<BvClubRow>> AddClub([FromBody] BvClubRow club)
    {
        var v = new ClubValidator(_clubDbService);
        var res = await v.ValidateAsync(club, options => options.IncludeRuleSets("Add").IncludeRulesNotInRuleSet());
        if (!res.IsValid)
            return Ok(res.ToBvResponse());

        var id = await _clubDbService.AddClub(club);
        return Ok(new BvResponse { Data = new { id } });
    }

    [Route("club")]
    [HttpPatch]
    public async Task<ActionResult<BvClubRow>> UpdateClub([FromBody] BvClubRow club)
    {
        var v = new ClubValidator(_clubDbService);
        var res = await v.ValidateAsync(club, options => options.IncludeRuleSets("Update").IncludeRulesNotInRuleSet());
        if (!res.IsValid)
            return Ok(res.ToBvResponse());

        var id = await _clubDbService.UpdateClub(club);
        return Ok(new BvResponse { Data = new { id } });
    }

    [Route("club/{clubId}")]
    [HttpDelete]
    public async Task<ActionResult<BvClubRow>> DeleteClub([FromRoute] int clubId, bool confirmed = false)
    {
        if (!confirmed)
            return Ok(new ValidationResult(new List<ValidationFailure>
                { new("confirmed", "You must confirm deletion or all removal.") }).ToBvResponse());
        await _clubDbService.DeleteClub(new BvClubRow { Id = clubId });
        return Ok();
    }

    [Route("club/{clubId}")]
    [HttpGet]
    public async Task<ActionResult<BvClubRow>> GetClub([FromRoute] int clubId)
    {
        var club = await _clubDbService.GetClubById(new BvClubRow { Id = clubId });
        var regions = _regionDbService.GetRegions();
        return Ok(new BvResponse
        {
            Data = new { club }
        });
    }

    [Route("club/{clubId}/rides")]
    [HttpGet]
    public async Task<ActionResult<BvClubRow>> GetClubRides([FromRoute] int clubId)
    {
        var rides = await _clubDbService.GetRidesForClub(new BvClubRow { Id = clubId });
        return Ok(new BvResponse
        {
            Data = new { rides }
        });
    }    
    
    [Route("club/{clubId}/events")]
    [HttpGet]
    public async Task<ActionResult<BvClubRow>> GetClubEvents([FromRoute] int clubId)
    {
        var events = await _clubDbService.GetEventsForClub(new BvEventRow() { Id = clubId });
        return Ok(new BvResponse
        {
            Data = new { events }
        });
    }
}