using Bikevent.Config;
using Bikevent.Database;
using Bikevent.DataObjects;
using Bikevent.Validation;
using Humanizer;
using Microsoft.AspNetCore.Mvc;

namespace Bikevent.Website.Controllers;

[ApiController]
[Route("api/v1")]
public class ApiController : Controller
{
    private readonly ClubDbService _clubDbService;
    private readonly BvConfigurationService _configurationService;
    private readonly MiscDbService _miscDbService;


    public ApiController(ClubDbService clubDbService, BvConfigurationService configurationService,
        MiscDbService miscDbService)
    {
        _clubDbService = clubDbService;
        _configurationService = configurationService;
        _miscDbService = miscDbService;
    }

    [Route("config")]
    [HttpGet]
    public async Task<object> Config()
    {
        return Ok(new
            {
                _configurationService.Domain,
                _configurationService.IsDevEnvironment
            }
        );
    }
    
    // dev only endpoints
    [Route("db/{table}")]
    [HttpGet]
    public async Task<List<DbTableMeta>> GetTableMeta(string table)
    {
        if (_configurationService.IsDevEnvironment)
        {
            var meta = await _miscDbService.GetTableMeta(table);
            return meta.ToList();
        }

        return null;
    }
}