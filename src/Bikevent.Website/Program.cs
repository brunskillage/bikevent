using System.Reflection;
using System.Text;
using Bikevent.Config;
using Bikevent.Database;
using Bikevent.Migrations;
using Bikevent.Validation;
using Bikevent.Website.Controllers;
using FluentMigrator.Runner;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

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
        builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(options => {
            options.TokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidateLifetime = true,
                ValidateIssuerSigningKey = true,
                ValidIssuer = builder.Configuration["Jwt:Issuer"],
                ValidAudience = builder.Configuration["Jwt:Audience"],
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
            };
        });
        
        // add CORS

        builder.Services.AddCors(options =>
        {
            options.AddDefaultPolicy(
                policy =>
                {
                    policy.WithOrigins("http://localhost:3000", 
                            "https://localhost:3000",
                            "https://api.brunskillage.org.uk",
                            "https://auth.brunskillage.org.uk")
                        .AllowAnyHeader()
                        .AllowAnyMethod();
                });
        });


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

        // ! stop automatic model validation for ApiControllers - When using it automatically caused
        // validation errors depite nothing I was aware of being enforced
        builder.Services.Configure<ApiBehaviorOptions>(options
            => options.SuppressModelStateInvalidFilter = true);


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
        miscDb.ClearDbVersionInfo();
        using (var scope = app.Services.CreateScope())
        {
            var migrator = scope.ServiceProvider.GetService<IMigrationRunner>();
            migrator!.ListMigrations();
            // migrator.MigrateUp(001);
        };


        app.Run();
    }
}