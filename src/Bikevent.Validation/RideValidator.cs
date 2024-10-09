using Bikevent.Database.TableObjects;
using FluentValidation;

namespace Bikevent.Validation;

public class RideValidator : AbstractValidator<BvRideRow>
{
    public RideValidator()
    {
        RuleFor(c => c.Title).NotEmpty().Length(3, 255)
            .WithMessage("Event Name must be at least 3 Letters and no more than 255");
        RuleFor(c => c.LinklUrl).Length(3, 255);
    }
}