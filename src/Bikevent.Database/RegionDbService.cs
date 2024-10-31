using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bikevent.Database;

public class bvRegionRow
{
    public int Id { get; set; }
    public string NameOf { get; set; }
    public string Code { get; set; }
    public string Island { get; set; }
}


public class RegionDbService
{
    private readonly List<bvRegionRow> RegionRows = new List<bvRegionRow>();

    public List<bvRegionRow> GetRegions()
    {
        return RegionRows;
    }
        

    public RegionDbService()
    {
        var lines = RegionRaw.Split("|");
        RegionRows = lines.Select(line =>
        {
            var parts = line.Split(',');
            return new bvRegionRow
            {
                Id = int.Parse(parts[0]),
                NameOf = parts[1],
                Island = parts[3],
                Code = parts[4]
            };
        } ).OrderBy(r=>r.NameOf).ToList();
    }

    private string RegionRaw = @"
        13,West Coast,Greymouth,South,NZ-WTC|
        1,Northland,Whangārei,North,NZ-NTL|
        7,Taranaki,Stratford,North,NZ-TKI|
        6,Hawke's Bay,Napier,North,NZ-HKB|
        16,Southland,Invercargill,South,NZ-STL|
        15,Otago,Dunedin,South,NZ-OTA|
        8,Manawatū-Whanganui,Palmerston North,North,NZ-MWT|
        9,Wellington,Wellington,North,NZ-WGN|
        10,Tasman,Richmond,South,NZ-TAS|
        11,Nelson,Nelson,South,NZ-NSN|
        3,Waikato,Hamilton,North,NZ-WKO|
        12,Marlborough,Blenheim,South,NZ-MBH|
        5,Gisborne,Gisborne,North,NZ-GIS|
        14,Canterbury,Christchurch,South,NZ-CAN|
        4,Bay of Plenty,Whakatāne,North,NZ-BOP|
        2,Auckland,Auckland,North,NZ-AUK";
}