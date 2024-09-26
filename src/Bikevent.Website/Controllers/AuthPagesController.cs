using Microsoft.AspNetCore.Mvc;

namespace Bikevent.Website.Controllers
{
    public class AuthPagesController : Controller
    {
        [Route("login")]
        [HttpPost]
        public IActionResult Login()
        {
            return View("Login");
        }       
        
        [Route("logout")]
        [HttpGet]
        public IActionResult LogOut()
        {
            return View("Login");
        }

        [Route("signup")]
        [HttpPost]
        public IActionResult SignUp()
        {
            return View("Signup");
        }
    }
}
