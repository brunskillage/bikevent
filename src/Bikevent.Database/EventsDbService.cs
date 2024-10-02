using Bikevent.Config;
using Dapper.Contrib.Extensions;

namespace Bikevent.Database;

public class EventsDbService : BaseDbClientService
{
    public EventsDbService(BvConfigurationService config) : base(config)
    {
    }

    public async Task<IEnumerable<BvEventRow>> GetEvents()
    {
        await using var conn = await GetOpenConnectionAsync();
        var res = await conn.GetAllAsync<BvEventRow>();
        return res;
    }

    public async Task<BvEventRow> GetEvent(int id)
    {
        await using var conn = await GetOpenConnectionAsync();
        var res = await conn.GetAsync<BvEventRow>(id);
        return res;
    }

    public async Task<BvEventRow> AddEvent(BvEventRow row)
    {
        await using var conn = await GetOpenConnectionAsync();
        var res = await conn.UpdateAsync(row);
        return row;
    }

    public async Task<bool> DeleteEvent(int id)
    {
        await using var conn = await GetOpenConnectionAsync();
        var res = await conn.DeleteAsync(new BvEventRow { Id = id });
        return res;
    }
}