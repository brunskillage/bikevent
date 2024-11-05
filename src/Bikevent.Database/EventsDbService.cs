using Bikevent.Config;
using Bikevent.Database.TableObjects;
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

    public async Task<int> AddEvent(BvEventRow bvevent)
    {
        bvevent.CreatedOn = DateTime.Now;
            bvevent.ModifiedOn = DateTime.Now;

        await using var conn = await GetOpenConnectionAsync();
        var res = await conn.InsertAsync(bvevent);
        return res;
    }

    public async Task<BvEventRow> GetEventById(BvEventRow bvevent)
    {
        await using var conn = await GetOpenConnectionAsync();
        var res = await conn.GetAsync<BvEventRow>(bvevent.Id);
        return res;
    }

    public async Task<bool> EventExists(string nameOf)
    {
        var res = await BvQueryAsync<BvEventRow>("select id from events where nameof = @nameOf limit 1", new { nameOf });
        return res.Count() == 1;
    }

    public async Task<bool> UpdateEvent(BvEventRow bvevent)
    {
        await using var conn = await GetOpenConnectionAsync();
        var res = await conn.UpdateAsync(bvevent);
        return res;
    }

    public async Task<bool> DeleteEvent(BvEventRow bvevent)
    {
        await using var conn = await GetOpenConnectionAsync();
        var res = await conn.DeleteAsync(bvevent);
        return res;
    }
}