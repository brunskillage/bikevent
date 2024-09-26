using Microsoft.AspNetCore.Mvc;

namespace Bikevent.Website.Controllers
{
    public class ClubPagesController : Controller
    {
        [Route("/club/register")]
        public IActionResult Register()
        {
            return View("RegisterClub");
        }        
        
        [Route("/clubs")]
        public IActionResult ViewClubs()
        {
            return View("ViewClubs");
        }
    }
}
