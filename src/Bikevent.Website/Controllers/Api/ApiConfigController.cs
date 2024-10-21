using System.Net.Mime;
using Bikevent.Config;
using Microsoft.AspNetCore.Mvc;

namespace Bikevent.Website.Controllers.Api;

[ApiController]
[Produces(MediaTypeNames.Application.Json)]
[Route("api/v1")]
public class ApiConfigController : Controller
{
    private readonly BvConfigurationService _configurationService;
    
    public ApiConfigController(BvConfigurationService configurationService) {
        _configurationService = configurationService;
    }

    [Route("config")]
    [HttpGet]
    public async Task<object> Config()
    {
        return Ok(new
            {
                _configurationService.IsDevEnvironment,
                _configurationService.TokenExpiryMinutes,
                _configurationService.TimerASeconds
            }
        );
    }
}