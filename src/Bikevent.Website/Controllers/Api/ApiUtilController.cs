using System.Net.Mime;
using System.Net.NetworkInformation;
using Bikevent.Config;
using Bikevent.Core.handlers;
using Bikevent.Database;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Bikevent.Website.Controllers.Api;

[ApiController]
[Produces(MediaTypeNames.Application.Json)]
[Route("api/v1")]
public class ApiUtilController : Controller
{
    private readonly BvConfigurationService _configurationService;
    private readonly MiscDbService _miscDbService;
    private readonly IMediator _mediator;


    public ApiUtilController(BvConfigurationService configurationService,
        MiscDbService miscDbService, IMediator mediator)
    {
        _configurationService = configurationService;
        _miscDbService = miscDbService;
        _mediator = mediator;
    }

    // dev only endpoints
    [Route("ping")]
    [HttpGet]
    public async Task<PingResponse> Ping()
    {
        var response = await _mediator.Send(new PingRequest{Id = "Test"});
        return response;
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