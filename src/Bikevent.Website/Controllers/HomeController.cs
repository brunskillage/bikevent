using Bikevent.Website.Models;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using Bikevent.Database;

namespace Bikevent.Website.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly ClubDbService _dbClientService;

        public HomeController(ILogger<HomeController> logger, ClubDbService dbClientService)
        {
            _logger = logger;
            _dbClientService = dbClientService;
        }

        public IActionResult Index()
        {
            return View("Home");
        }
        

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
