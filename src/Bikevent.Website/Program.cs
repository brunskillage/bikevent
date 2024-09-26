using Bikevent.Config;
using Bikevent.Database;

namespace Bikevent.Website;

public class Program
{
    public static void Main(string[] args) {
        var builder = WebApplication.CreateBuilder(args);

        ConfigurationManager configuration = builder.Configuration; // allows both to access and to set up the config
        IWebHostEnvironment environment = builder.Environment;

        builder.Services.AddSingleton<IConfiguration>(configuration);
        builder.Services.AddSingleton<BvConfigurationService>();
        builder.Services.AddSingleton<ClubDbService>();

        // Add services to the container.
        builder.Services.AddControllersWithViews();

        var app = builder.Build();

        var db = app.Services.GetService<ClubDbService>();
        db.Test();

        var clubs = db.GetClubs();

        // Configure the HTTP request pipeline.
        if (!app.Environment.IsDevelopment())
        {
            app.UseExceptionHandler("/Home/Error");
            // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
            app.UseHsts();
        }

        app.UseHttpsRedirection();
        app.UseStaticFiles();

        app.UseRouting();

        app.UseAuthorization();

        app.MapControllerRoute(
            "default",
            "{controller=Home}/{action=Index}/{id?}");

        app.Run();
    }
}