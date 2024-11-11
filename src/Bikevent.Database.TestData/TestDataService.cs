using Bikevent.Database.TableObjects;
using Bogus;

namespace Bikevent.Database.TestData;

public class TestDataService
{
    private const int testUserCount = 10;
    private const int testRideCOunt = 50;
    private const int testClubCount = 10;
    private const int testEventCount = 50;
    private readonly ClubDbService _clubDbService;
    private readonly RidesDbService _ridesDbService;
    private readonly UserDbService _userDbService;
    private readonly EventsDbService _eventsDbService;

    public TestDataService(ClubDbService clubDbService, 
        RidesDbService ridesDbService, 
        UserDbService userDbService, 
        EventsDbService eventsDbService)
    {
        _clubDbService = clubDbService;
        _ridesDbService = ridesDbService;
        _userDbService = userDbService;
        _eventsDbService = eventsDbService;
    }

    public void Insert()
    {
        Randomizer.Seed = new Random(3897234);

        /////// USERS ///////
        var tesUser = new Faker<BvUserRow>()
                .RuleFor(c => c.Email, c => c.Internet.Email())
                .RuleFor(c => c.NickName, c => c.Name.FullName())
                .RuleFor(c => c.EncPassword, c => BCrypt.Net.BCrypt.HashPassword("Pass123"))
                .RuleFor(c => c.CreatedOn, DateTime.Now)
            ;
        var testUsers = tesUser.Generate(testUserCount);
        testUsers.Add(new BvUserRow
        {
            EncPassword = BCrypt.Net.BCrypt.HashPassword("Pass123"),
            Email = "abrunskill@yahoo.co.uk",
            CreatedOn = DateTime.Now,
            NickName = "brunskillage"
        });

        /////// CLUBS ///////
        var testClub = new Faker<BvClubRow>()
                .RuleFor(c => c.NameOf, c => c.Company.CompanyName() + "Club")
                .RuleFor(c => c.Email, c => c.Internet.Email())
                .RuleFor(c => c.President, c => c.Name.FullName())
                .RuleFor(c => c.WebsiteUrl, c => c.Internet.Url())
                .RuleFor(c => c.CreatedById, c => c.Random.Number(10))
                .RuleFor(c => c.RegionId, c => c.Random.Number(1, 16))
                .RuleFor(c => c.CreatedOn, c => DateTime.Now)
            ;

        var testClubs = testClub.Generate(testClubCount);


        /////// RIDES ///////
        var testRide = new Faker<BvRideRow>()
                .RuleFor(r => r.ClubId, r => r.Random.Number(1, 20))
                .RuleFor(r => r.CreatedById, r => r.Random.Number(1, 10))
                .RuleFor(r => r.CreatedOn, r => DateTime.Now)
                .RuleFor(r => r.Title, r => $"Ride to {r.Random.String2(5)}")
                .RuleFor(r => r.DescriptionOf, r => "Desc XXX")
                .RuleFor(r => r.StartLocation, r => $"Location {r.Random.String2(5)}")
                .RuleFor(r => r.StartsOn, r => r.Date.Soon(90))
                .RuleFor(r => r.EndsOn, (f,current) => current.StartsOn.Value.AddHours(3))
            ;
        var testRides = testRide.Generate(testRideCOunt);


        /////// EVENTS ///////
        var testEvent = new Faker<BvEventRow>()
            .RuleFor(r => r.ClubId, r => r.Random.Number(1, testClubCount))
            .RuleFor(r => r.CreatedById, r => r.Random.Number(1, testUserCount))
            .RuleFor(r => r.CreatedOn, r => DateTime.Now)
            .RuleFor(r => r.Title, r => $"Event of {r.Random.String2(5)}")
            .RuleFor(r => r.Location, r => $"Location {r.Random.String2(5)}")
            .RuleFor(r => r.DescriptionOf, r => $"Desc XXX")
            .RuleFor(r => r.StartsOn, r => r.Date.Soon(90))
            .RuleFor(r => r.EndsOn, (f, current) => current.StartsOn.Value.AddHours(3))

                ;
        var testEvents = testEvent.Generate(testEventCount);


        testUsers.ForEach(async u => { await _userDbService.AddUser(u); });
        testClubs.ForEach(async c => { await _clubDbService.AddClub(c); });
        testRides.ForEach(async r => { await _ridesDbService.AddRide(r); });
        testEvents.ForEach(async r => { await _eventsDbService.AddEvent(r);});
    }
}