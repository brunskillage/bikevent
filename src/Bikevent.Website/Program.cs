using System.Net.NetworkInformation;
using Bikevent.Config;
using Bikevent.Core.handlers;
using Bikevent.Database;
using Bikevent.Database.TestData;
using Bikevent.Validation;
using Bikevent.Website.Controllers;
using Bikevent.Website.Startup;
using FluentMigrator.Runner;
using Microsoft.AspNetCore.Antiforgery;
using Microsoft.AspNetCore.Mvc;

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
        builder.Services.AddSingleton<RegionDbService>();
        builder.Services.AddSingleton<TestDataService>();

        builder.Services.AddSingleton<RideValidator>();
        builder.Services.AddSingleton<EventValidator>();
        builder.Services.AddSingleton<ClubValidator>();
        builder.Services.AddSingleton<UserValidator>();

        // experimental
        // use a dynamically invoked remote call to drastically reduce bolierplate and get out v1
        builder.Services.AddTransient<DoHandler>();


        // Add services to the container.
        builder.Services.AddControllersWithViews(options =>
        {
            // used becuase empty dates were not being allowed
            options.AllowEmptyInputInBodyModelBinding = true;
        });

        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();

        //builder.Services.AddWebOptimizer();

        //JWT Authentication
        builder.Services.AddAuth(configuration);

        // add CORS
        builder.Services.AddCors(options =>
        {
            options.AddDefaultPolicy(
                policy =>
                {
                    //policy.WithOrigins("http://localhost:3000",
                    //        "https://localhost:3000",
                    //        "https://www.bikevent.nz",
                    //        "https://api.brunskillage.org.uk",
                    //        "https://auth.brunskillage.org.uk",
                    //        "http://192.168.1.240:3000",
                    //        "http://192.168.1.74:3000")
                    //    .AllowAnyHeader()
                    //    .AllowAnyMethod();                    
                    policy.WithOrigins("*")
                        .AllowAnyHeader()
                        .AllowAnyMethod();
                });
        });


        // add migrations
        builder.Services.AddMigrations(configuration);
        // end add migrations

        // ! stop automatic model validation for ApiControllers - When using it automatically caused
        // validation errors depite nothing I was aware of being enforced
        builder.Services.Configure<ApiBehaviorOptions>(options
            => options.SuppressModelStateInvalidFilter = true);

        builder.Services.AddMediatR(cfg => cfg.RegisterServicesFromAssemblies(typeof(PingHandler).Assembly));

        var app = builder.Build();

        // End building

        var hostUrl = configuration["hosturl"]; // add this line
        if (string.IsNullOrEmpty(hostUrl)) // add this line
            hostUrl = "http://0.0.0.0:5001"; // add this line


        var clubsDb = app.Services.GetService<ClubDbService>();
        clubsDb!.TestAsync();





        // Configure the HTTP request pipeline.
        if (!app.Environment.IsDevelopment())
        {
            app.UseExceptionHandler("/Home/Error");
            // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
            app.UseHsts();
        }

        app.UseHttpsRedirection();

        // minify and optimise
        // https://github.com/ligershark/WebOptimizer?tab=readme-ov-file#install-and-setup
        //app.UseWebOptimizer();

        app.UseStaticFiles();

        app.UseRouting();

        app.UseAuthentication();

        app.UseCors();

        app.MapControllerRoute(
            "default",
            "{controller=Home}/{action=Index}/{id?}");


        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
            app.UseSwagger(options => { options.SerializeAsV2 = true; });
        }

        // run migrations

        using (var scope = app.Services.CreateScope())
        {
            var migrator = scope.ServiceProvider.GetService<IMigrationRunner>();
            migrator!.ListMigrations();
            // TODO use runner - for now easier just to uncomment during rapid dev
            // uncomment below to run migration
            var miscDb = app.Services.GetService<MiscDbService>();
            miscDb.ClearDbVersionInfo();
            migrator.MigrateUp(001);

            // uncomment for test Data
            // var testDataService = app.Services.GetService<TestDataService>();
            // testDataService!.Insert();
        }



        app.Run();
    }
}