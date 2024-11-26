using Bikevent.Database;
using Bikevent.Database.TableObjects;
using FluentValidation;

namespace Bikevent.Validation;

public class EventValidator : AbstractValidator<BvEventRow>
{
    private readonly EventsDbService _eventsDbService;

    public EventValidator(EventsDbService eventsDbService )
    {
        _eventsDbService = eventsDbService;


        RuleFor(c => c.Title).NotEmpty().Length(3, 255)
            .WithMessage("Event Title must be at least 3 Letters and no more than 255");
        RuleFor(c => c.Location).Length(3, 255).WithMessage("Please enter the Location for this event");
        RuleFor(c => c.StartsOn).NotEmpty().WithMessage("Please enter the Start Time");
        RuleFor(c => c.EndsOn).NotEmpty().WithMessage("Please enter the End Time for this event");
    }
}