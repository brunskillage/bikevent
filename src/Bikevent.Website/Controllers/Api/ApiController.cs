using System.Net.Mime;
using Bikevent.Config;
using Bikevent.Database;
using Microsoft.AspNetCore.Mvc;

namespace Bikevent.Website.Controllers.Api;

[ApiController]
[Produces(MediaTypeNames.Application.Json)]
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
                 _configurationService.IsDevEnvironment,
                _configurationService.TokenExpiryMinutes
            }
        );
    }
    
    // dev only endpoints
    [Route("db/{table}")]
    [HttpGet]
    public async Task<List<DbTableMeta>> GetTableMeta(string table)
    {
        if (_configurationService.IsDevEnvironment.Value)
        {
            var meta = await _miscDbService.GetTableMeta(table);
            return meta.ToList();
        }

        return null;
    }
}