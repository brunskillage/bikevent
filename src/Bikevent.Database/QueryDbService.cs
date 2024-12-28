using Bikevent.Config;
using Bikevent.Database.TableObjects;
using Microsoft.VisualBasic.CompilerServices;

namespace Bikevent.Database;

public class QueryDbService : BaseDbClientService
{
    public QueryDbService(BvConfigurationService config) : base(config)
    {
    }


    public async Task<List<RideCountByRegionRow>> GetRideCountForRegions()
    {
        var sql = @"select g.regionId, count(g.rideId) as CountOfRides 
                    from (select r.id as rideId,r.title, c.regionId from clubs 
                    inner join rides on c.id = r.clubId) as group by regionId";
        var res = await BvQueryAsync<RideCountByRegionRow>(sql);
        return res.ToList();
    }

    public async Task<List<RideCountByClubRow>> GetRideCountForClubs()
    {
        var sql = @"select g.clubId, g.clubName, count(g.rideId) as CountOfRides from 
                        (select c.id as clubId, c.nameOf as clubName, r.id as rideId from clubs c
                        inner join rides r 
                        on c.id = r.clubId) as g
                        group by clubName";
        var res = await BvQueryAsync<RideCountByClubRow>(sql);
        return res.ToList();
    }

    public async Task<List<RideCountByClubRow>> GetRidesByUserid(int userId)
    {
        var sql = @"select g.clubId, g.clubName, count(g.rideId) as CountOfRides from 
                        (select c.id as clubId, c.nameOf as clubName, r.id as rideId from clubs c
                        inner join rides r 
                        on c.id = r.clubId) as g
                        group by clubName";
        var res = await BvQueryAsync<RideCountByClubRow>(sql);
        return res.ToList();
    }    
    
    public async Task<List<dynamic>> GetLatestRides()
    {
        var sql = @"select r.*, c.logoImagePath, c.nameOf, c.regionId
            from rides r
            inner join clubs c on 
            r.clubId = c.id
            order by r.startsOn Desc
            LIMIT 10;";
        var res = await BvQueryAsync<dynamic>(sql);
        return res.ToList();
    }
}

