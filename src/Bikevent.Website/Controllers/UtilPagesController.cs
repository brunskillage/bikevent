using Microsoft.AspNetCore.Mvc;

namespace Bikevent.Website.Controllers;

public class UtilPagesController : Controller
{
    [Route("util")]
    [HttpGet]
    public IActionResult Index()
    {
        return View("UtilPage");
    }        
}