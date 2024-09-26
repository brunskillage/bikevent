namespace Bikevent.Database.TableObjects;

public class ClubRow
{
    public string nameOf { get; set; }
    public string description { get; set; }
    public string president { get; set; }
    public string email { get; set; }
    public string websiteUrl { get; set; }
    public string mainImageRef { get; set; }
    public string googleMapUrl { get; set; }
    public int id { get; set; }
    private DateTime createdOn { get; set; }
    private DateTime updatedOn { get; set; }
}