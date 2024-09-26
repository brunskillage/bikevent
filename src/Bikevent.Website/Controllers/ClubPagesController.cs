using Microsoft.AspNetCore.Mvc;

namespace Bikevent.Website.Controllers
{
    public class ClubPagesController : Controller
    {
        [Route("/club/register")]
        [HttpPost]
        public IActionResult Register()
        {
            return View("RegisterClub");
        }        
        
        [Route("/clubs")]
        [HttpGet]
        public IActionResult ViewClubs()
        {
            return View("ViewClubs");
        }
    }
}
