namespace Bikevent.Website.Models;

public class BvInputModel
{
    public string NameOf { get; set; }
    public string Label { get; set; }
    public string Error { get; set; }
    public string Prompt { get; set; }
    public string PlaceHolder { get; set; }
    public string Val { get; set; }
    public string Type { get; set; } = "text";
    public DisplayMode DMode { get; set; }
}