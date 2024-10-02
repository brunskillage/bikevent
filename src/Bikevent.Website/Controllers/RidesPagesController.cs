using Bikevent.Database;
using Bikevent.Validation;
using Bikevent.Website.Models;
using Microsoft.AspNetCore.Mvc;

namespace Bikevent.Website.Controllers;

public class RidesPagesController : Controller
{
    private readonly RidesDbService _ridesDbService;
    private readonly RideValidator _rideValidator;

    public RidesPagesController(RidesDbService ridesDbService, RideValidator _rideValidator)
    {
        _ridesDbService = ridesDbService;
        _rideValidator = _rideValidator;
    }

    [Route("rides")]
    [HttpGet]
    public async Task<ActionResult> GetRides(BvRideRow vbEvent)
    {
        var rides = await _ridesDbService.GetRides();
        var model = new RidesPageModel();
        model.Rides = rides;
        return View("Rides", model);
    }

    [Route("ride/{id}")]
    [HttpGet]
    public async Task<ActionResult> GetRide([FromRoute] int id)
    {
        var ride = await _ridesDbService.GetRide(id);
        var model = new RidePageModel{ RideItem= ride};
        return View("Ride", model);
    }
    
    [Route("ride/add")]
    [HttpGet]
    public async Task<IActionResult> AddRide(BvRideRow bvEvent)
    {
        

        return View("Ride");
    }

    [Route("ride/{id}/edit")]
    [HttpGet]
    public async Task<IActionResult> EditRide(BvRideRow bvEvent)
    {
        return View("Ride");
    }
}