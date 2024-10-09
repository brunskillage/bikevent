using Bikevent.Config;
using Bikevent.Database.TableObjects;
using Dapper.Contrib.Extensions;

namespace Bikevent.Database;

public class ClubDbService : BaseDbClientService
{
    public ClubDbService(BvConfigurationService config) : base(config)
    {
    }

    public async Task<IEnumerable<BvClubRow>> GetClubs()
    {
        await using var conn = await GetOpenConnectionAsync();
        var res = await conn.GetAllAsync<BvClubRow>();
        return res;
    }    
    
    public async Task<int> AddClub(BvClubRow club)
    {
        club.CreatedOn = DateTime.Now;
        club.ModifiedOn = DateTime.Now;
        
        await using var conn = await GetOpenConnectionAsync();
        var res = await conn.InsertAsync(club);
        return res;
    }

    public async Task<BvClubRow> GetClub(BvClubRow club)
    {
        await using var conn = await GetOpenConnectionAsync();
        var res = await conn.GetAsync<BvClubRow>(club.Id);
        return res;
    }

    public async Task<bool> ClubExists(string nameOf)
    {
        var res = await BvQueryAsync<BvClubRow>("select id from clubs where nameof = @nameOf limit 1", new { nameOf });
        return res.Count() == 1;
    }

    public async Task<bool> UpdateClub(BvClubRow club)
    {
        await using var conn = await GetOpenConnectionAsync();
        var res = await conn.UpdateAsync(club);
        return res;
    }

    public async Task<bool> DeleteClub(BvClubRow club)
    {
        await using var conn = await GetOpenConnectionAsync();
        var res = await conn.DeleteAsync(club);
        return res;
    }
}