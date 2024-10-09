using System.Reflection;
using Bikevent.Config;
using Bikevent.Database;
using Bikevent.Migrations;
using Bikevent.Validation;
using FluentMigrator.Runner;

namespace Bikevent.Website;

public class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        var configuration = builder.Configuration; // allows both to access and to set up the config
        var environment = builder.Environment;

        builder.Services.Configure<AppSettingsValues>(
            builder.Configuration.GetSection("AppSettings"));

        builder.Services.AddSingleton<IConfiguration>(configuration);
        builder.Services.AddSingleton<BvConfigurationService>();
        builder.Services.AddSingleton<ClubDbService>();
        builder.Services.AddSingleton<MiscDbService>();
        builder.Services.AddSingleton<EventsDbService>();
        builder.Services.AddSingleton<RidesDbService>();
        builder.Services.AddSingleton<UserDbService>();

        builder.Services.AddSingleton<RideValidator>();
        builder.Services.AddSingleton<EventValidator>();
        builder.Services.AddSingleton<ClubValidator>();
        builder.Services.AddSingleton<UserValidator>();


        // Add services to the container.
        builder.Services.AddControllersWithViews();

        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();


        // add migrations
        var ma = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "Bikevent.Migrations.dll");
        Assembly.LoadFile(ma);
        var migrations = AppDomain.CurrentDomain.GetAssemblies().Where(a => a.GetName().Name!.Contains("Bike")).ToArray();
        builder.Services.AddSingleton<FluentMigrator.Runner.Processors.ProcessorOptions>(); // bug not found if line missing

        builder.Services.AddLogging(c => c.AddFluentMigratorConsole())
            .AddFluentMigratorCore()
            .ConfigureRunner(config =>
            {
                config.AddMySql8()
                    .ConfigureGlobalProcessorOptions(c=>c.Timeout = TimeSpan.FromMinutes(1))
                    .WithGlobalConnectionString(configuration.GetConnectionString("BikeventMySqlConnection"))
                    .ScanIn(migrations).For.Migrations();
            });

        // end add migrations


        var app = builder.Build();
        
        var clubsDb = app.Services.GetService<ClubDbService>();
        var miscDb = app.Services.GetService<MiscDbService>();
        clubsDb!.TestAsync();


        // Configure the HTTP request pipeline.
        if (!app.Environment.IsDevelopment())
        {
            app.UseExceptionHandler("/Home/Error");
            // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
            app.UseHsts();
        }

        app.UseSwagger();
        app.UseSwaggerUI();

        app.UseHttpsRedirection();
        app.UseStaticFiles();

        app.UseRouting();

        // app.UseAuthorization();

        app.MapControllerRoute(
            "default",
            "{controller=Home}/{action=Index}/{id?}");

        app.UseSwagger(options => { options.SerializeAsV2 = true; });

        // run migrations
        miscDb.ClearDbVersionInfo();
        using (var scope = app.Services.CreateScope())
        {
            var migrator = scope.ServiceProvider.GetService<IMigrationRunner>();
            migrator!.ListMigrations();
            //migrator.MigrateUp(001);
        };


        app.Run();
    }
}