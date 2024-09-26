using Microsoft.AspNetCore.Mvc;

namespace Bikevent.Website.Controllers
{
    public class AuthPagesController : Controller
    {
        [Route("login")]
        public IActionResult Login()
        {
            return View("Login");
        }       
        
        [Route("logout")]
        public IActionResult LogOut()
        {
            return View("Login");
        }

        [Route("signup")]
        public IActionResult SignUp()
        {
            return View("Signup");
        }
    }
}
