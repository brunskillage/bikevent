using System.Net.Mime;
using Bikevent.Database;
using Bikevent.Database.TableObjects;
using Bikevent.DataObjects;
using Bikevent.Validation;
using Bikevent.Website.wwwroot;
using FluentValidation.Results;
using Microsoft.AspNetCore.Mvc;
using FluentValidation;
namespace Bikevent.Website.Controllers.Api;

[ApiController]
[Produces(MediaTypeNames.Application.Json)]
[Route("api/v1")]
public class ApiClubsController : Controller
{
    private readonly ClubDbService _clubDbService;

    public ApiClubsController(ClubDbService clubDbService)
    {
        _clubDbService = clubDbService;
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
    public async Task<ActionResult<BvClubRow>> AddClub([FromBody]BvClubRow club)
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
    public async Task<ActionResult<BvClubRow>> UpdateClub([FromBody]BvClubRow club)
    {

        var v = new ClubValidator(_clubDbService);
        var res = await v.ValidateAsync(club, options => options.IncludeRuleSets("Update").IncludeRulesNotInRuleSet());
        if (!res.IsValid)
            return Ok(res.ToBvResponse());

        var id = await _clubDbService.UpdateClub(club);
        return Ok(new BvResponse { Data = new { id } });
    }        
        
    [Route("club/{id}")]
    [HttpDelete]
    public async Task<ActionResult<BvClubRow>> DeleteClub([FromRoute]int id, bool confirmed = false)
    {
        if (!confirmed)
        {
            return Ok(new ValidationResult(new List<ValidationFailure>
                { new("confirmed", "You must confirm deletion or all removal.") }).ToBvResponse());
        }
        await _clubDbService.DeleteClub(new BvClubRow{Id = id});
        return Ok();
    }

    [Route("club/{id}")]
    [HttpGet]
    public async Task<ActionResult<BvClubRow>> GetClub([FromRoute]int id)
    {
        var club = await _clubDbService.GetClubById(new BvClubRow{Id = id});
        return Ok(new BvResponse
        {
            Data = new { club }
        });
    }
}