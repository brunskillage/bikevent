using System.Runtime.InteropServices.Marshalling;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;

namespace Bikevent.Config
{
    public class AppSettingsValues
    {
        public string Domain { get; set; }
    }

    public class BvConfigurationService
    {
        private readonly IConfiguration _configuration;

        public BvConfigurationService(IConfiguration configuration, IOptions<AppSettingsValues> options)
        {
            _configuration = configuration;

            BikeventConstring = configuration.GetConnectionString("BikeventMySqlConnection");
            Domain = options.Value.Domain;
            if (BikeventConstring == null)
            {
                throw new ArgumentNullException("BikeventMySqlConnection");
            }

            HostedEnvironment = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT").ToUpperInvariant();
            IsDevEnvironment = HostedEnvironment == "DEVELOPMENT";

        }


        public string? BikeventConstring { get; private set; }
        public string? HostedEnvironment { get; private set; }
        public bool IsDevEnvironment { get; private set; }
        public string Domain { get; private set; }
    }
}
