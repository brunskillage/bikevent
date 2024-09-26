using Bikevent.Config;
using Bikevent.Database.TableObjects;

namespace Bikevent.Database;

public class ClubDbService : BaseDbClientService
{
    public ClubDbService(BvConfigurationService config) : base(config)
    {

    }

    public async Task<IEnumerable<ClubRow>> GetClubs()
    {
        var res = await BvQuery<ClubRow>("select * from clubs;");
        return res;
    }
}