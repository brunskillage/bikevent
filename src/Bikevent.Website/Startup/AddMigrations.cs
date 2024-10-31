using FluentMigrator.Runner;
using System.Reflection;

namespace Bikevent.Website.Startup;

public static class Migrations
{
    public static void AddMigrations(this IServiceCollection services, ConfigurationManager configuration)
    {

        // add migrations
        var ma = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "Bikevent.Migrations.dll");
        Assembly.LoadFile(ma);
        var migrations = AppDomain.CurrentDomain.GetAssemblies().Where(a => a.GetName().Name!.Contains("Bike")).ToArray();
        services.AddSingleton<FluentMigrator.Runner.Processors.ProcessorOptions>(); // bug not found if line missing

        services.AddLogging(c => c.AddFluentMigratorConsole())
            .AddFluentMigratorCore()
            .ConfigureRunner(config =>
            {
                config.AddMySql8()
                    .ConfigureGlobalProcessorOptions(c => c.Timeout = TimeSpan.FromMinutes(1))
                    .WithGlobalConnectionString(configuration.GetConnectionString("BikeventMySqlConnection"))
                    .ScanIn(migrations).For.Migrations();
            });

        // end add migrations
    }
}