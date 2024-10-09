using Bikevent.Config;
using Bikevent.Database;
using Bikevent.Database.TableObjects;
using Bikevent.DataObjects;
using Bikevent.Validation;
using Bikevent.Website.wwwroot;
using Microsoft.AspNetCore.Mvc;

namespace Bikevent.Website.Controllers;

[Route("api/v1")]
public class ApiAuthController : Controller
{
    private readonly UserDbService _userDbService;
    private readonly BvConfigurationService _configurationService;

    public ApiAuthController(UserDbService userDbService, BvConfigurationService configurationService)
    {
        _userDbService = userDbService;
        _configurationService = configurationService;
    }

    [Route("login")]
    [HttpPost]
    public async Task<ActionResult<BvResponse>> Login([FromBody]BvUserRow user)
    {
        var val = new UserValidator(_userDbService);
        var res = await val.ValidateAsync(new BvUserRow { Email = user.Email, NickName = user.NickName, EncPassword = user.EncPassword});
        return Ok(res.ToBvResponse());
    }    
    
    [Route("account")]
    [HttpPost]
    public async Task<ActionResult<BvResponse>> SignUp([FromBody] BvUserRow user)
    {
        var val = new UserValidator(_userDbService);
        var res = await val.ValidateAsync(new BvUserRow { Email = user.Email, NickName = user.NickName, EncPassword = user.EncPassword});

        if (res.IsValid)
        {
            try
            {
                var hash =  BCrypt.Net.BCrypt.HashPassword("test");
                var ep =  BCrypt.Net.BCrypt.Verify("test",hash);

                user.EncPassword = hash;
                await _userDbService.AddUser(user);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }

        }

        return Ok(res.ToBvResponse());
    }
}