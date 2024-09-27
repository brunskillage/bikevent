using Bikevent.Config;
using Bikevent.Database;
using Bikevent.Database.TableObjects;
using Microsoft.AspNetCore.Mvc;

namespace Bikevent.Website.Controllers;

public class ApiController : Controller
{
    private readonly ClubDbService _clubDbService;
    private readonly BvConfigurationService _configurationService;
    private readonly MiscDbService _miscDbService;

    public ApiController(ClubDbService clubDbService, BvConfigurationService configurationService, MiscDbService  miscDbService)
    {
        _clubDbService = clubDbService;
        _configurationService = configurationService;
        _miscDbService = miscDbService;
    }
        

    [Route("api/clubs")]
    [HttpGet]
    public async Task<List<ClubRow>> GetClubs()
    {
        var clubs  = await _clubDbService.GetClubs();
        return clubs.ToList();
    }    
    
    [Route("api/club")]
    [HttpPost]
    public async Task<ClubRow> AddClub()
    {

        return new ClubRow();
    }

    // dev only endpoints
    [Route("api/db/{table}")]
    [HttpGet]
    public async Task<List<DbTableMeta>> GetTableMeta(string table)
    {
            if (_configurationService.IsDevEnvironment)
            {
                var meta =  await _miscDbService.GetTableMeta(table);
                return meta.ToList();
            }

            return null;
    }
}