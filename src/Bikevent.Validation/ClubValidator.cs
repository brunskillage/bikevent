using Bikevent.Database;
using Bikevent.Database.TableObjects;
using FluentValidation;

namespace Bikevent.Validation
{
    public class ClubValidator: AbstractValidator<BvClubRow>
    {
        const int minClubNameLength = 6;
        const int maxClubNameLength = 255;


        public ClubValidator(ClubDbService clubDbService)
        {
            RuleFor(c => c.NameOf).Length(minClubNameLength, maxClubNameLength).WithMessage($"Club Name must be at least {minClubNameLength} Letters and no more than {maxClubNameLength}");
            RuleFor(c => c.President).Length(minClubNameLength, maxClubNameLength).WithMessage($"President/Contact must be at least {minClubNameLength} Letters and no more than {maxClubNameLength}");
            RuleFor(c => c.Email).EmailAddress().WithMessage("Please use a valid email address");

            When(c => c.WebsiteUrl != null, () =>
            {
                RuleFor(c => c.WebsiteUrl).Matches("https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)")
                    .WithMessage("Please enter a valid website address");
            });

            RuleFor(x => x.NameOf).MustAsync( async (nameOf, s) =>
            {
                var res = await clubDbService.ClubExists(nameOf);
                return !res;
            }).WithMessage("The Club already exists, please enter a different name");
        }
    }
}
