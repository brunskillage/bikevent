using Bikevent.Config;

namespace Bikevent.Database;

public class MiscDbService : BaseDbClientService
{
    public MiscDbService(BvConfigurationService config) : base(config)
    {
    }

    public string GetCSharpObjects(string tableName)
    {
        var sql = @"
select '" + tableName + @"' INTO @table; #table name
select 'bikeventdb' into @schema; #database name
select concat('public class ',UCASE(LEFT(@table,1)), SUBSTRING(@table,2),'Row {') as MySqlClassGen
union
select concat('public ',ttc.dtype,case when IS_NULLABLE = 'YES' and ttc.dtype != 'string' then '?' else '' end,' ',UCASE(LEFT(column_name, 1)),SUBSTRING(column_name, 2),' {get; set;}') from  information_schema.columns c
join( #datatypes mapping
select 'char' as orign ,'string' as dtype union all
select 'varchar' ,'string' union all
select 'longtext' ,'string' union all
select 'text' ,'string' union all
select 'set' ,'string' union all
select 'bit' ,'int' union all
select 'shorte_prodottoe_prodotto' ,'int' union all
select 'int' ,'int' union all
select 'smallint' ,'sbyte' union all
select 'bigint' ,'long' union all
select 'float' ,'double' union all
select 'double' ,'double' union all
select 'decimal' ,'double' union all
select 'timestamp' ,'DateTime' union all
select 'date' ,'DateTime' union all
select 'datetime' ,'DateTime' union all
select 'boolean' ,'bool' union all
select 'tinyint' ,'bool'
) ttc on c.data_type like ttc.orign
where table_schema=@schema and table_name=@table union
select '}';";

        var res = BvQuerySync<string>(sql);
        var str = string.Join(Environment.NewLine, res);

        return str;
    }

    public string GetTSInterface(string tableName)
    {

        var sql = @"
select '" + tableName + @"' INTO @table; #table name
select 'bikeventdb' into @schema; #database name
select concat('interface ',UCASE(LEFT(@table,1)), SUBSTRING(@table,2),' {') as MySqlClassGen
union
select concat('    ',LCASE(LEFT(column_name, 1)),SUBSTRING(column_name, 2),case when IS_NULLABLE = 'YES' then '?' else '' end,': ',ttc.dtype) from  information_schema.columns c
join( #datatypes mapping
select 'char' as orign ,'string' as dtype union all
select 'varchar' ,'string' union all
select 'longtext' ,'string' union all
select 'text' ,'string' union all
select 'set' ,'string' union all
select 'bit' ,'number' union all
select 'shorte_prodottoe_prodotto' ,'number' union all
select 'int' ,'number' union all
select 'smallint' ,'number' union all
select 'bigint' ,'number' union all
select 'float' ,'number' union all
select 'double' ,'number' union all
select 'decimal' ,'number' union all
select 'timestamp' ,'string' union all
select 'date' ,'string' union all
select 'datetime' ,'string' union all
select 'boolean' ,'boolean' union all
select 'tinyint' ,'boolean'
) ttc on c.data_type like ttc.orign
where table_schema=@schema and table_name=@table union
select '}';";

        var res = BvQuerySync<string>(sql);
        var str = string.Join(Environment.NewLine, res);

        return str;
    }


    public string GetTSClass(string tableName)
    {
        var sql = @"
select '" + tableName + @"' INTO @table; #table name
select 'bikeventdb' into @schema; #database name
select concat('class ',UCASE(LEFT(@table,1)), SUBSTRING(@table,2,length(@table)-2)),' {') as MySqlClassGen
union
select '   constructor('
union
select concat('  public ',LCASE(LEFT(column_name, 1)),SUBSTRING(column_name, 2),'? : ',ttc.dtype) from  information_schema.columns c
join( #datatypes mapping
select 'char' as orign ,'string' as dtype union all
select 'varchar' ,'string, ' union all
select 'longtext' ,'string, ' union all
select 'text' ,'string, ' union all
select 'set' ,'string, ' union all
select 'bit' ,'number, ' union all
select 'shorte_prodottoe_prodotto' ,'number, ' union all
select 'int' ,'number, ' union all
select 'smallint' ,'number, ' union all
select 'bigint' ,'number, ' union all
select 'float' ,'number, ' union all
select 'double' ,'number, ' union all
select 'decimal' ,'number, ' union all
select 'timestamp' ,'string, ' union all
select 'date' ,'string, ' union all
select 'datetime' ,'string, ' union all
select 'boolean' ,'boolean, ' union all
select 'tinyint' ,'boolean, '
) ttc on c.data_type like ttc.orign
where table_schema=@schema and table_name=@table 
union
select '   )  {}'
union
select '}'
;";

        var res = BvQuerySync<string>(sql);
        var str = string.Join(Environment.NewLine, res);

        return str;
    }

}