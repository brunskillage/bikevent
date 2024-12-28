using System.Collections.Concurrent;
using System.Net;
using System.Net.Mime;
using System.Reflection;
using Bikevent.DataObjects;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace Bikevent.Website.Controllers.Api;

/// <summary>
/// Experimental to reduce boilerplate
/// idea is that can quickly wire up server functions
/// in doHandler - we will see!
/// </summary>
[ApiController]
[Produces(MediaTypeNames.Application.Json)]
[Route("api/v1")]
public class ApiDynamicController : Controller
{
    private readonly DoHandler _doHandler;
    private static readonly Type HandlerType = typeof(DoHandler);
    private static readonly ConcurrentDictionary<string, MethodInfo?> Methods = new();

    public ApiDynamicController(DoHandler doHandler)
    {
        _doHandler = doHandler;
    }

    /// <summary>
    /// This dynamically invokes a method in the dohandler class / could be anything
    /// I had to use Json.net to acheive the dynamic structure required to resolve runtime objects
    /// could possible be middleware
    /// </summary>
    /// <returns>A standard bvResponse</returns>
    [Route("do")]
    [HttpPost]
    public async Task<ActionResult<BvResponse>> Do()
    {
        string json;
        using (var reader = new StreamReader(Request.Body)) 
            json = await reader.ReadToEndAsync();

        if (string.IsNullOrWhiteSpace(json))
            return StatusCode((int)HttpStatusCode.BadRequest);

        // only Json.net does what I want here to 
        var payload = JsonConvert.DeserializeObject<ClientPayload>(json);

        if (string.IsNullOrWhiteSpace(payload?.action))
            return StatusCode((int)HttpStatusCode.BadRequest);

        // var methodInfo = _handlerType.GetMethod(payload.action);
        var methodInfo =  Methods.GetOrAdd(payload.action,HandlerType.GetMethod);

        if (methodInfo == null) 
            return StatusCode((int)HttpStatusCode.BadRequest);

        // var result1 = await (dynamic)methodInfo.Invoke(_doHandler, new object[1] { payload.data });
        var result1 = await (Task<BvResponse>)methodInfo.Invoke(_doHandler, [payload.data]);

        return Ok(result1);
    }
}