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
        return new BvResponse
        {
            Data = new
            {
                _configurationService.Domain
            }
        };
    }


    [Route("clubs")]
    [HttpGet]
    public async Task<ActionResult<BvResponse>> GetClubs()
    {
        var clubs = await _clubDbService.GetClubs();

        var data = new { clubs = clubs.ToList() };

        return new JsonResult(new BvResponse { Data = data });
    }

    [Route("club")]
    [HttpPost]
    public async Task<ActionResult<BvClubRow>> AddClub(BvClubRow club)
    {
        var v = new ClubValidator();
        var res = v.Validate(club);
        if (!res.IsValid)
            return new JsonResult(new BvResponse
            {
                Error = "Invalid Data Supplied",
                Data = new
                {
                    errors = res.Errors.Select(e => new BvError
                    {
                        PropName = e.PropertyName.Camelize(),
                        Message = e.ErrorMessage,
                        CurrentVal = e.AttemptedValue.ToString()
                    })
                }
            });

        var id = await _clubDbService.AddClub(club);
        return new JsonResult(new BvResponse { Data = new { id } });
    }

    [Route("club/{id}")]
    [HttpGet]
    public async Task<ActionResult<BvClubRow>> GetClub(BvClubRow club)
    {
        var res = await _clubDbService.GetClub(club);
        return new JsonResult(new BvResponse
        {
            Data = new { res }
        });
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