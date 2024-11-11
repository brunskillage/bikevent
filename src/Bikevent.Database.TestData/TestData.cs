using Bikevent.Database.TableObjects;
using Bogus;

namespace Bikevent.Database.TestData;

public class TestData
{
    private readonly ClubDbService _clubDbService;
    private readonly RidesDbService _ridesDbService;
    private readonly UserDbService _userDbService;

    public TestData(ClubDbService _clubDbService, RidesDbService ridesDbService, UserDbService userDbService)
    {
        this._clubDbService = _clubDbService;
        _ridesDbService = ridesDbService;
        _userDbService = userDbService;
    }

    const int testUserCount = 10;
    const int testRideCOunt = 30;
    const int testClubCount = 10;

    public void Insert()
    {
        Randomizer.Seed = new Random(3897234);

        var testClub = new Faker<BvClubRow>()
                .RuleFor(c => c.NameOf, c => c.Company.CompanyName() + "Club")
                .RuleFor(c => c.Email, c => c.Internet.Email())
                .RuleFor(c => c.President, c => c.Name.FullName())
                .RuleFor(c => c.WebsiteUrl, c => c.Internet.Url())
                .RuleFor(c => c.CreatedById, c => c.Random.Number(10))
                .RuleFor(c => c.RegionId, c => c.Random.Number(1,16))
            ;

        var testCLubs = testClub.Generate(testClubCount);
        testCLubs.ForEach(async c =>
        {
            await _clubDbService.AddClub(c);
        });

        var tesUser = new Faker<BvUserRow>()
                .RuleFor(c => c.Email, c => c.Internet.Email())
                .RuleFor(c => c.NickName, c => c.Name.FullName())
                .RuleFor(c => c.EncPassword, c => BCrypt.Net.BCrypt.HashPassword("Pass123"))
                .RuleFor(c => c.CreatedOn, DateTime.Now)
            ;

        var testUsers = tesUser.Generate(testUserCount);
        testUsers.ForEach(async u =>
        {
            await _userDbService.AddUser(u);
        });

        var testRide = new Faker<BvRideRow>()
                .RuleFor(r => r.ClubId, r => r.Random.Number(1, 20))
                .RuleFor(r => r.CreatedById, r => r.Random.Number(1, 10))
                .RuleFor(r => r.CreatedOn, r => DateTime.Now)
                .RuleFor(r => r.Title, r => $"Ride to {r.Random.String2(5)}")
                .RuleFor(r => r.DescriptionOf, r => $"{r.Random.String(100)}")
                .RuleFor(r => r.StartsOn, r => r.Date.Soon(90))
                .RuleFor(r => r.EndsOn, r => r.Date.Future(refDate:DateTime.Now.AddDays(90)))
            ;
        var testRides = testRide.Generate(testRideCOunt);
        testRides.ForEach(async r =>
        {
            await _ridesDbService.AddRide(r);
        });
    }
}