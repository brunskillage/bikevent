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

        }


        public string? BikeventConstring { get; private set; }
    }
}
