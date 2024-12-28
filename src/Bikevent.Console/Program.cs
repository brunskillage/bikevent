using Bikevent.Config;
using Bikevent.Database;
using Bikevent.Database.TestData;
using Bikevent.Migrations;
using FluentMigrator.Runner;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Bikevent.Console;

internal class Program
{
    private const bool ADD_TESTDATA = true;

    public static async Task Main(string[] args)
    {
        Environment.SetEnvironmentVariable("ASPNETCORE_ENVIRONMENT", "development");
        Environment.SetEnvironmentVariable("NETCORE_ENVIRONMENT", "development");

        // Build the configuration
        IConfiguration config = new ConfigurationBuilder()
            .SetBasePath(AppContext.BaseDirectory)
            .AddJsonFile("appsettings.json", true, true)
            .AddUserSecrets<Program>()
            .Build();

        var constr = config.GetConnectionString("BikeventMySqlConnection");

        using var serviceProvider = createServices(config);
        using var scope = serviceProvider.CreateScope();

        var migrator = serviceProvider.GetRequiredService<IMigrationRunner>();
        migrator.ListMigrations();

        // TODO use runner - for now easier just to uncomment during rapid dev
        // uncomment below to run migration
        // this is not ideal but gets the job done for now
        // move to a runner and 

        var miscDb = serviceProvider.GetService<MiscDbService>();
        miscDb!.ClearDbVersionInfo();
        migrator.MigrateUp(001);

        if (ADD_TESTDATA)
        {
           await AddTestData(serviceProvider);
            
        }
    }

    private static ServiceProvider createServices(IConfiguration configuration)
    {
        var constr = configuration.GetConnectionString("BikeventMySqlConnection");

        var services = new ServiceCollection();

        services.AddSingleton(configuration);
        services.AddSingleton<BvConfigurationService>();
        services.AddSingleton<ClubDbService>();
        services.AddSingleton<MiscDbService>();
        services.AddSingleton<EventsDbService>();
        services.AddSingleton<RidesDbService>();
        services.AddSingleton<UserDbService>();
        services.AddSingleton<RegionDbService>();
        services.AddSingleton<TestDataService>();
        services.AddFluentMigratorCore()
            .ConfigureRunner(rb => rb
                // Add SQLite support to FluentMigrator
                .AddMySql8()
                // Set the connection string
                .WithGlobalConnectionString(constr)
                // Define the assembly containing the migrations
                .ScanIn(typeof(Migration_001).Assembly).For.Migrations())

            // Enable logging to console in the FluentMigrator way
            .AddLogging(lb => lb.AddFluentMigratorConsole());


        return services.BuildServiceProvider(false);
    }


    /// <summary>
    ///     Update the database
    /// </summary>
    private static async Task AddTestData(IServiceProvider serviceProvider)
    {
        var testDataService = serviceProvider.GetService<TestDataService>();
        await testDataService!.Insert();
    }
}