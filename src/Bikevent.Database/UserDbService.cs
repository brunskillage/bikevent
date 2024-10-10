using Bikevent.Config;
using Bikevent.Database.TableObjects;
using Dapper;
using Dapper.Contrib.Extensions;

namespace Bikevent.Database;

public class UserDbService : BaseDbClientService
{
    public UserDbService(BvConfigurationService config) : base(config)
    {

    }

    public async Task<IEnumerable<BvUserRow>> GetUsers()
    {
        await using var conn = await GetOpenConnectionAsync();
        var res = await conn.GetAllAsync<BvUserRow>();
        return res;
    }

    public async Task<BvUserRow> GetUser(int id)
    {
        await using var conn = await GetOpenConnectionAsync();
        var res = await conn.GetAsync<BvUserRow>(id);
        return res;
    }
    
    public async Task<BvUserRow> GetUserByNameOrEmail(BvUserRow user)
    {
        await using var conn = await GetOpenConnectionAsync();
        var res = await conn.QueryAsync<BvUserRow>("select id,encPassword from users where (nickName = @Nickname or email=@email) limit 1", new BvUserRow
        {
            NickName = user.NickName, Email = user.Email
        });
        return res.FirstOrDefault();
    }

    public async Task<BvUserRow> AddUser(BvUserRow row)
    {
        row.CreatedOn = DateTime.Now;
        await using var conn = await GetOpenConnectionAsync();
        var res = await conn.InsertAsync(row);
        return row;
    }

    public async Task<bool> DeleteUser(int id)
    {
        await using var conn = await GetOpenConnectionAsync();
        var res = await conn.DeleteAsync(new BvUserRow { Id = id });
        return res;
    }


    public async Task<bool> EmailExists(string email)
    {
        if (string.IsNullOrWhiteSpace(email)) return false;
        await using var conn = await GetOpenConnectionAsync();
        var res = await conn.QueryAsync<BvUserRow>("select id from users where email=@email limit 1", new { email});
        return res.Any();
    }

    public async Task<bool> NickNameExists(string nickName)
    {
        if (string.IsNullOrWhiteSpace(nickName)) return false;
        await using var conn = await GetOpenConnectionAsync();
        var res = await conn.QueryAsync<BvUserRow>("select id from users where nickName=@nickName limit 1", new { nickName});
        return res.Any();
    }
}