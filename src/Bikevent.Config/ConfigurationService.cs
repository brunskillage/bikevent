using System.Runtime.InteropServices.Marshalling;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;

namespace Bikevent.Config
{
    public class BvConfigurationService
    {
        private readonly IConfiguration _configuration;

        public BvConfigurationService(IConfiguration configuration, IOptions<AppSettingsValues> options)
        {
            _configuration = configuration;

            BikeventConstring = configuration.GetConnectionString("BikeventMySqlConnection");

            if (BikeventConstring == null)
            {
                throw new ArgumentNullException("BikeventMySqlConnection");
            }

            Salt = GetConfigValueOrThrow<string>("AppSettings:Salt")!;
            ApiDomain = GetConfigValueOrThrow<string>("AppSettings:Domain")!;
            TokenExpiryMinutes = configuration.GetValue<int>("AppSettings:TokenExpiryMinutes")!;

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

        public T GetConfigValueOrThrow<T>(string path)
        {
            var val = _configuration.GetValue<T>(path);
            if (val is null) throw new FieldAccessException("Configuration item not found " + path);
            return val;
        }

        public string GetEnvironmentValueOrThrow(string path)
        {
            var val = Environment.GetEnvironmentVariable(path);
            if (string.IsNullOrWhiteSpace(val)) throw new FieldAccessException("Environment Variable item not found " + path);
            return val;
        }

    }
}
