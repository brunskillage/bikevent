using Bikevent.Database;
using Bikevent.Database.TableObjects;
using FluentValidation;

namespace Bikevent.Validation;

public class RideValidator : AbstractValidator<BvRideRow>
{


    public RideValidator(RidesDbService _ridesDbService)
    { 
        
        ClassLevelCascadeMode = CascadeMode.Stop;

        RuleFor(c => c.Title).Length(6, 255)
            .WithMessage("Ride name must be at least 3 Letters and no more than 255");
        RuleFor(c => c.LinklUrl).Length(3, 255);
        RuleFor(r => r.StartsOn).NotNull().WithMessage("Please select a Starts On Date");
        RuleFor(r => r.EndsOn).NotNull().WithMessage("Please select a Ends On Date");


        //RuleFor(r => r.StartsOn).Must(v => v.Value > DateTime.Now).DependentRules(() =>
        //{
        //    RuleFor(s => s).Must(ride => ride.EndsOn > ride.StartsOn)
        //        .WithMessage("Ends on must be after Start On date");
        //});


    }
}