using Bikevent.Database;
using Bikevent.DataObjects;
using FluentValidation.Results;
using Humanizer;

namespace Bikevent.Website.wwwroot
{
    public static class ExtensionMethods
    {
        public static BvResponse? ToBvResponse(this ValidationResult validation)
        {
            return new BvResponse
            {
                Error = validation.Errors.Any() ? "Invalid Data Supplied, See errors list" : string.Empty,
                Data = new
                {
                    errors = validation.Errors.Select(e => new BvError
                    {
                        PropName = e.PropertyName.Camelize(),
                        Message = e.ErrorMessage,
                        CurrentVal = e.AttemptedValue?.ToString()
                    })
                }
            };
        }
    }
}
