using Bikevent.Config;
using Bikevent.Database;
using Bikevent.Database.TableObjects;
using Bikevent.DataObjects;
using Bikevent.Validation;
using Bikevent.Website.wwwroot;
using FluentValidation;
using Microsoft.AspNetCore.Mvc;

namespace Bikevent.Website.Controllers;

[Route("api/v1")]
public class ApiAuthController : Controller
{
    private readonly BvConfigurationService _configurationService;
    private readonly UserDbService _userDbService;

    public ApiAuthController(UserDbService userDbService, BvConfigurationService configurationService)
    {
        _userDbService = userDbService;
        _configurationService = configurationService;
    }


    [Route("login")]
    [HttpPost]
    public async Task<ActionResult<BvResponse>> Login([FromBody] BvUserRow user)
    {
        var val = new UserValidator(_userDbService);
        var res = await val.ValidateAsync(new BvUserRow
                { Email = user.Email, NickName = user.NickName, EncPassword = user.EncPassword },
            options => options.IncludeRuleSets("Login"));


        return Ok(res.ToBvResponse());
    }

    [Route("account")]
    [HttpPost]
    public async Task<ActionResult<BvResponse>> SignUp([FromBody] BvUserRow user)
    {
        var val = new UserValidator(_userDbService);
        var res = await val.ValidateAsync(new BvUserRow
                { Email = user.Email, NickName = user.NickName, EncPassword = user.EncPassword },
            options => options.IncludeRuleSets("Create"));

        if (res.IsValid)
        {
            var hash = BCrypt.Net.BCrypt.HashPassword(user.EncPassword);
            user.EncPassword = hash;
            await _userDbService.AddUser(user);
        }

        return Ok(res.ToBvResponse());
    }

    //public class CV
    //{
    //    public string Name => "Allan Brunskill";
    //    public string Email => "abrunskill@yahoo.co.uk";
    //    public string Mobile => "0224380627";
    //    public string Location => "Hamilton";
    //    public List<IndustryExperience> Experience { get; set; } = new();
    //    public List<Qualifications> Qualifications { get; set; } = new();
    //    public List<Interests> Interests { get; set; } = new();

    //    private void AddExperience()
    //    {
    //    }

    //    private void AddQualkifications()
    //    {
    //    }

    //    private void AdInterests()
    //    {

    //    }

    //    public override string ToString()
    //    {
    //        return "Print all the CV things";
    //    }
    //}

    //public class Interests
    //{
    //}

    //public class Qualifications
    //{
    //}

    //public class IndustryExperience
    //{

    //    public DateTime StartYYMM  { get; set; }
    //    public DateTime EndYYMM  { get; set; }
    //    public string Company  { get; set; }
    //    public string Url { get; set; }
    //    public List<RelevantPoints> Tasks { get; set; }
    //    public List<Tech> TechUsed { get; set; }
    //}
}