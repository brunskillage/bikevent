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

    public async Task<BvRideRow> GetRide(int id)
    {
        await using var conn = await GetOpenConnectionAsync();
        var res = await conn.GetAsync<BvRideRow>(id);
        return res;
    }

    public async Task<BvRideRow> AddRide(BvRideRow row)
    {
        await using var conn = await GetOpenConnectionAsync();
        var res = await conn.InsertAsync(row);
        return row;
    }

    public async Task<bool> DeleteRide(int id)
    {
        await using var conn = await GetOpenConnectionAsync();
        var res = await conn.DeleteAsync(new BvRideRow { Id = id });
        return res;
    }

}