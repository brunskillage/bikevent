using Bikevent.Database;
using Bikevent.Database.TableObjects;
using Bikevent.Website.Models;
using Microsoft.AspNetCore.Mvc;

namespace Bikevent.Website.Controllers;

public class EventsPagesController : Controller
{
    private readonly EventsDbService _eventsDbService;

    public EventsPagesController(EventsDbService eventsDbService)
    {
        _eventsDbService = eventsDbService;
    }

    [Route("event/{id}")]
    [HttpGet]
    public IActionResult GetEvent([FromRoute]int id)
    {
        return View("Event");
    }        
            
    [Route("events")]
    [HttpGet]
    public async Task<ActionResult> GetEvents(BvEventRow vbEvent)
    {
        var events = await _eventsDbService.GetEvents();
        var model = new EventsPageModel { Events = events };
        return View("Events", model);
    }        
        
    [Route("event/add")]
    [HttpGet]
    public async Task<IActionResult> AddEvent(BvEventRow bvEvent)
    {
        return View("Event");
    }    
    
    [Route("event/{id}/edit")]
    [HttpGet]
    public async Task<IActionResult> EditEvent(BvEventRow bvEvent)
    {
        return View("Event");
    }
}