using Bikevent.Config;
using Dapper;
using MySqlConnector;

namespace Bikevent.Database
{

    /// <summary>
    /// Uses
    /// https://mysqlconnector.net/overview/installing/
    /// </summary>
    public abstract class BaseDbClientService
    {
        private readonly BvConfigurationService _config;

        public BaseDbClientService(BvConfigurationService config)
        {
            _config = config;
        }

        public MySqlConnection GetOpenConnection()
        {
            var connection = new MySqlConnection(_config.BikeventConstring);
            connection.Open();
            return connection;
        }
        
        public async void Test()
        {
            await using var conn = GetOpenConnection();
            var res = await conn.ExecuteAsync("select 1+ 1");
        }

        public async Task<IEnumerable<T>> BvQuery<T>(string sql)
        {
            try
            {
                await using var conn = GetOpenConnection();
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
                using var conn = GetOpenConnection();
                var res = conn.Query<T>(sql);
                return res;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }

        public async Task BvExecute<T>(string sql)
        {
            try
            {
                await using var conn = GetOpenConnection();
                await conn.ExecuteAsync(sql);

            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }
    }
}
