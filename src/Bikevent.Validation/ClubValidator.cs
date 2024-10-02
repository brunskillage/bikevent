using Bikevent.Database;
using FluentValidation;

namespace Bikevent.Validation
{
    public class ClubValidator: AbstractValidator<BvClubRow>
    {
        public ClubValidator(ClubDbService clubDbService)
        {
            RuleFor(c => c.NameOf).NotEmpty().Length(3, 255).WithMessage("Club Name must be at least 3 Letters and no more than 255");
            RuleFor(c => c.President).NotEmpty().Length(3, 255);
            RuleFor(c => c.Email).NotEmpty().EmailAddress();

            When(c => c.WebsiteUrl != null, () =>
            {
                RuleFor(c => c.WebsiteUrl).Matches("https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)")
                    .WithMessage("Please enter a valid website address");
            });

            RuleFor(x => x.NameOf).MustAsync( async (nameOf, s) =>
            {
                var res = await clubDbService.ClubExists(nameOf);
                return !res;
            }).WithMessage("The Club already exists");
        }
    }
}
