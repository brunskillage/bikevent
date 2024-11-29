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
public class ApiEventsController : Controller
{
    private readonly EventsDbService _eventsDbService;

    public ApiEventsController(EventsDbService eventsDbService)
    {
        _eventsDbService = eventsDbService;
    }

    [Route("events")]
    [HttpGet]
    public async Task<ActionResult<BvResponse>> GetEvents()
    {
        var events = await _eventsDbService.GetEvents();
        return Ok(
            new BvResponse
            {
                Data = new
                {
                    events
                }
            });
    }

    [Route("event")]
    [HttpPost]
    public async Task<ActionResult<BvEventRow>> AddEvent(BvEventRow bvevent)
    {
        var v = new EventValidator(_eventsDbService);
        var res = await v.ValidateAsync(bvevent, options => options.IncludeRuleSets("Add").IncludeRulesNotInRuleSet());
        if (!res.IsValid)
            return Ok(res.ToBvResponse());

        var id = await _eventsDbService.AddEvent(bvevent);
        return Ok(new BvResponse
        {
            Data = new
            {
                id
            }
        });
    }

    [Route("event")]
    [HttpPatch]
    public async Task<ActionResult<BvEventRow>> UpdateEvent([FromBody] BvEventRow bvevent)
    {
        var v = new EventValidator(_eventsDbService);
        //var res = await v.ValidateAsync(event, options => options.IncludeRuleSets("Update").IncludeRulesNotInRuleSet());
        var res = await v.ValidateAsync(bvevent);
        if (!res.IsValid)
            return Ok(res.ToBvResponse());

        var id = await _eventsDbService.UpdateEvent(bvevent);
        return Ok(new BvResponse { Data = new { id } });
    }

    [Route("event/{id}")]
    [HttpDelete]
    public async Task<ActionResult<BvEventRow>> DeleteEvent([FromRoute] int id, bool confirmed = false)
    {
        if (!confirmed)
            return Ok(new ValidationResult(new List<ValidationFailure>
                { new("confirmed", "You must confirm deletion or all removal.") }).ToBvResponse());
        await _eventsDbService.DeleteEvent(new BvEventRow { Id = id });
        return Ok();
    }

    [Route("event/{eventId}")]
    [HttpGet]
    public async Task<ActionResult<BvEventRow>> GetEvent([FromRoute] int eventId)
    {
        var Event = await _eventsDbService.GetEventById(new BvEventRow { Id = eventId });
        return Ok(new BvResponse
        {
            Data = new { Event }
        });
    }
}