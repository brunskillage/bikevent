using Bikevent.Database;
using FluentValidation;

namespace Bikevent.Validation;

public class EventValidator : AbstractValidator<BvEventRow>
{
    public EventValidator(EventsDbService clubDbService)
    {
        RuleFor(c => c.Title).NotEmpty().Length(3, 255)
            .WithMessage("Event Name must be at least 3 Letters and no more than 255");
        RuleFor(c => c.LinklUrl).Length(3, 255);
    }
}