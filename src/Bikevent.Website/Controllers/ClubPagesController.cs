using Bikevent.Database;
using Bikevent.Validation;
using Bikevent.Website.Models;
using Microsoft.AspNetCore.Mvc;

namespace Bikevent.Website.Controllers
{
    public class ClubPagesController : Controller
    {
        private readonly ClubDbService _clubDb;


        public ClubPagesController(ClubDbService clubDb)
        {
            _clubDb = clubDb;
        }

        [Route("/register")]
        [HttpGet]
        public IActionResult Register()
        {
            return View("RegisterClub");
        }        
        
        [Route("/clubs")]
        [HttpGet]
        public async Task<IActionResult> GetClubs()
        {
            var clubs = await _clubDb.GetClubs();

            var model = new ClubsPageModel
            {
                ClubRows = clubs.ToList()
            };

            return View("Clubs", model);
        }        
        
        [Route("/club")]
        [HttpGet]
        public async Task<ActionResult> AddClub([FromBody]BvClubRow bvClub)
        {
            return View("RegisterClub");
        }        
        
        [Route("/club/{id}")]
        [HttpGet]
        public async Task<ActionResult> GetClub([FromRoute]int id)
        {
            var club = await _clubDb.GetClub(new BvClubRow {Id = id});
            var model = new ClubPageModel
            {
               Club  = club
            };
            return View("ViewClub", model);
        }       
        
        [Route("/club/{id}/edit")]
        [HttpGet]
        public async Task<ActionResult> EditClub([FromRoute]int id)
        {
            var club = await _clubDb.GetClub(new BvClubRow {Id = id});
            var model = new ClubPageModel
            {
               Club  = club
            };

            return View("ViewClub", model);
        }
    }
}
