using Bikevent.Config;
using Bikevent.Database.TableObjects;
using Dapper.Contrib.Extensions;

namespace Bikevent.Database;

public class RidesDbService : BaseDbClientService
{
    public RidesDbService(BvConfigurationService config) : base(config)
    {
    }

    public async Task<IEnumerable<BvRideRow>> GetRides()
    {
        await using var conn = await GetOpenConnectionAsync();
        var res = await conn.GetAllAsync<BvRideRow>();
        return res;
    }

    public async Task<int> AddRide(BvRideRow ride)
    {
        ride.CreatedOn = DateTime.Now;
        ride.ModifiedOn = DateTime.Now;

        await using var conn = await GetOpenConnectionAsync();
        var res = await conn.InsertAsync(ride);
        return res;
    }

    public async Task<BvRideRow> GetRideById(BvRideRow ride)
    {
        await using var conn = await GetOpenConnectionAsync();
        var res = await conn.GetAsync<BvRideRow>(ride.Id);
        return res;
    }

    public async Task<bool> RideExists(string nameOf)
    {
        var res = await BvQueryAsync<BvRideRow>("select id from rides where nameof = @nameOf limit 1", new { nameOf });
        return res.Count() == 1;
    }

    public async Task<bool> UpdateRide(BvRideRow ride)
    {
        await using var conn = await GetOpenConnectionAsync();
        var res = await conn.UpdateAsync(ride);
        return res;
    }

    public async Task<bool> DeleteRide(BvRideRow ride)
    {
        await using var conn = await GetOpenConnectionAsync();
        var res = await conn.DeleteAsync(ride);
        return res;
    }
}