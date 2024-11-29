using Bikevent.Database.TableObjects;
using Bikevent.Database;
using Bikevent.DataObjects;
using Bikevent.Validation;
using Microsoft.AspNetCore.Mvc;
using System.Net.Mime;
using Bikevent.Website.wwwroot;
using FluentValidation;
using FluentValidation.Results;

namespace Bikevent.Website.Controllers.Api
{
    [ApiController]
    [Produces(MediaTypeNames.Application.Json)]
    [Route("api/calendar")]
    public class ApiCalendarController : Controller
    {
  
    }
}
