using Bikevent.Config;
using Dapper;
using MySqlConnector;

namespace Bikevent.Database;

/// <summary>
///     Uses
///     https://mysqlconnector.net/overview/installing/
/// </summary>
public abstract class BaseDbClientService
{
    private readonly BvConfigurationService _config;

    public BaseDbClientService(BvConfigurationService config)
    {
        _config = config;
    }

    public async Task<MySqlConnection> GetOpenConnectionAsync()
    {
        var connection = new MySqlConnection(_config.BikeventConstring);
        await connection.OpenAsync();
        return connection;
    }

    public MySqlConnection GetOpenConnectionSync()
    {
        var connection = new MySqlConnection(_config.BikeventConstring);
        connection.Open();
        return connection;
    }


    public async void TestAsync()
    {
        using var conn = await GetOpenConnectionAsync();
        var res = await conn.ExecuteAsync("select 1+ 1");
    }


    public async Task<IEnumerable<T>> BvQueryAsync<T>(string sql)
    {
        try
        {
            using var conn = await GetOpenConnectionAsync();
            var res = await conn.QueryAsync<T>(sql);
            return res;
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }
    }

    public IEnumerable<T> BvQuerySync<T>(string sql)
    {
        try
        {
            using var conn = GetOpenConnectionSync();
            var res = conn.Query<T>(sql);
            return res;
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }
    }

    public async Task BvExecuteAsync(string sql)
    {
        try
        {
            await using var conn = await GetOpenConnectionAsync();
            await conn.ExecuteAsync(sql);
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }
    }

    public void BvExecuteSync(string sql)
    {
        using var conn = GetOpenConnectionSync();
        conn.ExecuteAsync(sql);
    }
}