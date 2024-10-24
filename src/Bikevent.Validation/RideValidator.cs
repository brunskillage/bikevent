﻿using Bikevent.Database;
using Bikevent.Database.TableObjects;
using FluentValidation;

namespace Bikevent.Validation;

public class RideValidator : AbstractValidator<BvRideRow>
{


    public RideValidator(RidesDbService _ridesDbService)
    {
        RuleFor(c => c.Title).NotEmpty().Length(3, 255)
            .WithMessage("Ride name must be at least 3 Letters and no more than 255");
        RuleFor(c => c.LinklUrl).Length(3, 255);
    }
}