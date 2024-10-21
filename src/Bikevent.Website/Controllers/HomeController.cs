using Bikevent.Website.Models;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using Bikevent.Database;
using System.IO;
using Bikevent.Config;

namespace Bikevent.Website.Controllers
{
    public class HomeController : Controller
    {
        private readonly BvConfigurationService _configurationService;

        public HomeController(BvConfigurationService configurationService)
        {
            _configurationService = configurationService;
        }

        //[Route("")]
        //[HttpGet]
        //public IActionResult Home()
        //{
        //    // dev "\\..\\..\\..\\wwwroot\\index.html"
        //    // build "\\wwwroot\\index.html"
        //    var index = System.IO.File.ReadAllText(AppDomain.CurrentDomain.BaseDirectory + _configurationService.StaticHomepageHtmlRelativePath); 
        //    return Content(index, contentType:"text/html");
        //    // return View("Home");
        //}

        [Route("utility")]
        [HttpGet]
        public IActionResult Util()
        {
            return View("UtilPage");
        }


        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
