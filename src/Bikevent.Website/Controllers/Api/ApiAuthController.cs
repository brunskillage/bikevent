using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Bikevent.Config;
using Bikevent.Database;
using Bikevent.Database.TableObjects;
using Bikevent.DataObjects;
using Bikevent.Validation;
using Bikevent.Website.wwwroot;
using FluentValidation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;
using Microsoft.IdentityModel.Tokens;

namespace Bikevent.Website.Controllers.Api;

[ApiController]
[Route("api/v1")]
public class ApiAuthController : ControllerBase
{
    private readonly BvConfigurationService _configurationService;
    private readonly UserDbService _userDbService;

    public ApiAuthController(UserDbService userDbService, BvConfigurationService configurationService)
    {
        _userDbService = userDbService;
        _configurationService = configurationService;
    }


    [Route("login")]
    [AllowAnonymous]
    [HttpPost]
    public async Task<ActionResult<BvResponse>> Login([FromBody] BvUserRow user)
    {
        var val = new UserValidator(_userDbService);
        var res = await val.ValidateAsync(new BvUserRow
        { Email = user.Email, EncPassword = user.EncPassword },
            options => options.IncludeRuleSets("Login"));

        if (res.IsValid)
        {
            var token = GenerateToken(user);

            return Ok(new BvResponse
            {
                Data = new
                {
                    token,
                    user = new BvUserRow
                    {
                        NickName = val.UserRow.NickName,
                        Email = val.UserRow.Email
                        

                    }
                }
            });
        }

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

    // To generate token
    private string GenerateToken(BvUserRow user)
    {
        var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configurationService.JwtKey));
        var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
        var claims = new[]
        {
            new Claim(ClaimTypes.NameIdentifier,user.Email),
            new Claim(ClaimTypes.Role,"Admin|Club|Member"),
            new Claim("Id",user.Id.ToString())
        };
        var token = new JwtSecurityToken(_configurationService.JwtIssuer,
            _configurationService.JwtAudience,
            claims,
            expires: DateTime.Now.AddMinutes(_configurationService.TokenExpiryMinutes!.Value),
            signingCredentials: credentials);


        return new JwtSecurityTokenHandler().WriteToken(token);

    }
}