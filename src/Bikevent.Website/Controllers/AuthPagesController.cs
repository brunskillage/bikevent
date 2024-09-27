using Microsoft.AspNetCore.Mvc;

namespace Bikevent.Website.Controllers
{
    public class AuthPagesController : Controller
    {
        [Route("login")]
        [HttpGet]
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
        [HttpGet]
        public IActionResult SignUp()
        {
            return View("Signup");
        }
    }
}
