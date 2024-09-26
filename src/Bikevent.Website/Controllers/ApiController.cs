using Bikevent.Database;
using Bikevent.Database.TableObjects;
using Microsoft.AspNetCore.Mvc;

namespace Bikevent.Website.Controllers;

public class ApiController : Controller
{
    private readonly ClubDbService _clubDbService;

    public ApiController(ClubDbService clubDbService)
    {
        _clubDbService = clubDbService;
    }
        

    [Route("api/clubs")]
    [HttpGet]
    public async Task<List<ClubRow>> GetClubs()
    {
        var clubs  = await _clubDbService.GetClubs();
        return clubs.ToList();
    }

        
}