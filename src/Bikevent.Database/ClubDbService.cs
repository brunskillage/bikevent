using Bikevent.Config;
using Bikevent.Database.TableObjects;
using Dapper;
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

    public async Task<BvClubRow> GetClubById(BvClubRow club)
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
        club.ModifiedOn = DateTime.Now;
        var res = await conn.UpdateAsync(club);
        return res;
    }

    public async Task<bool> DeleteClub(BvClubRow club)
    {
        await using var conn = await GetOpenConnectionAsync();
        var res = await conn.DeleteAsync(club);
        return res;
    }

    public async Task<List<BvRideRow>> GetRidesForClub(BvClubRow bvClubRow)
    {
        await using var conn = await GetOpenConnectionAsync();
        var res = await conn.QueryAsync<BvRideRow>("select * from rides where clubId=@clubId", new {clubId = bvClubRow.Id});
        return res.ToList();
    }

    public async Task<List<BvEventRow>> GetEventsForClub(BvEventRow bvEventRow)
    {
        await using var conn = await GetOpenConnectionAsync();
        var res = await conn.QueryAsync<BvEventRow>("select * from events where clubId=@clubId", new { clubId = bvEventRow.Id });
        return res.ToList();
    }
}