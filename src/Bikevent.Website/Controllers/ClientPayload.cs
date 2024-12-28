using System.Dynamic;

namespace Bikevent.Website.Controllers;

public class ClientPayload
{
    public ClientPayload(string action, ExpandoObject data)
    {
        this.action = action;
        this.data = data;
    }

    public string? action { get; set; }

    // public Dictionary<string, object> data { get; set; }
    public ExpandoObject data { get; set; }
}