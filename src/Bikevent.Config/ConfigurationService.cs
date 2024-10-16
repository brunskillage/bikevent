using System.Runtime.InteropServices.Marshalling;
using Microsoft.Extensions.Configuration;

namespace Bikevent.Config
{
    public class BvConfigurationService
    {
        private readonly IConfiguration _configuration;

        public BvConfigurationService(IConfiguration configuration)
        {
            _configuration = configuration;

            BikeventConstring = configuration.GetConnectionString("BikeventMySqlConnection");

            if (string.IsNullOrWhiteSpace(BikeventConstring))
                throw new ArgumentNullException(nameof(BikeventConstring));

            Salt = GetConfigValueOrThrow<string>("AppSettings:Salt")!;
            ApiDomain = GetConfigValueOrThrow<string>("AppSettings:Domain")!;
            TokenExpiryMinutes = configuration.GetValue<int>("AppSettings:TokenExpiryMinutes")!;
            StaticHomepageHtmlRelativePath = configuration.GetValue<string>("AppSettings:StaticHomepageHtmlRelativePath")!;

            HostedEnvironment = GetEnvironmentValueOrThrow("ASPNETCORE_ENVIRONMENT").ToUpperInvariant();
            IsDevEnvironment = HostedEnvironment == "DEVELOPMENT";
            JwtKey = GetConfigValueOrThrow<string>("Jwt:Key");
            JwtIssuer = GetConfigValueOrThrow<string>("Jwt:Issuer");
            JwtAudience= GetConfigValueOrThrow<string>("Jwt:Audience");
        }
        
        public string? BikeventConstring { get; }
        public string? HostedEnvironment { get; }
        public bool? IsDevEnvironment { get; }
        public string? ApiDomain { get; }
        public string? Salt { get; }
        public string? JwtIssuer { get; }
        public string? JwtKey { get; }
        public string? JwtAudience { get; }
        public int? TokenExpiryMinutes { get; }
        public string StaticHomepageHtmlRelativePath { get; set; }

        public T GetConfigValueOrThrow<T>(string path)
        {
            var val = _configuration.GetValue<T>(path);
            if (val is null) throw new FieldAccessException("Configuration item not found " + path);
            return val;
        }

        public static string GetEnvironmentValueOrThrow(string path)
        {
            var val = Environment.GetEnvironmentVariable(path);
            if (string.IsNullOrWhiteSpace(val)) throw new FieldAccessException("Environment Variable item not found " + path);
            return val;
        }

    }
}
