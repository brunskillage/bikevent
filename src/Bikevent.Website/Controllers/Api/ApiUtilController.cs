using System.Net.Mime;
using Bikevent.Config;
using Bikevent.Database;
using Microsoft.AspNetCore.Mvc;

namespace Bikevent.Website.Controllers.Api;

[ApiController]
[Produces(MediaTypeNames.Application.Json)]
[Route("api/v1")]
public class ApiUtilController : Controller
{
    private readonly BvConfigurationService _configurationService;
    private readonly MiscDbService _miscDbService;


    public ApiUtilController(BvConfigurationService configurationService,
        MiscDbService miscDbService)
    {
        _configurationService = configurationService;
        _miscDbService = miscDbService;
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