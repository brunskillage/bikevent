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
            if (BikeventConstring == null)
            {
                throw new ArgumentNullException("BikeventMySqlConnection");
            }

            HostedEnvironment = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT ").ToUpperInvariant();
            IsDevEnvironment = HostedEnvironment == "DEVELOPMENT";

        }


        public string? BikeventConstring { get; private set; }
        public string? HostedEnvironment { get; private set; }
        public bool IsDevEnvironment { get; private set; }
    }
}
