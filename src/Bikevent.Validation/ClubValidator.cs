using FluentValidation;

namespace Bikevent.Validation
{
    public class ClubValidator: AbstractValidator<BvClubRow>
    {
        public ClubValidator()
        {
            RuleFor(c => c.NameOf).Length(3, 255).WithMessage("Club Name must be at least 3 Letters and no more than 255");
            RuleFor(c => c.President).Length(3, 255);

            When(c => !string.IsNullOrWhiteSpace(c.Email) && c.Email.Length > 0, () =>
            {
                RuleFor(c => c.Email).EmailAddress();
            });

            When(c => c.WebsiteUrl != null, () =>
            {
                RuleFor(c => c.WebsiteUrl).Matches("https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)")
                    .WithMessage("Please enter a valid website address");
            });

        }
    }
}
