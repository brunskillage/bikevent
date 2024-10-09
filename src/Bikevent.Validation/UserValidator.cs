using System.Text.RegularExpressions;
using System.Xml;
using Bikevent.Database;
using Bikevent.Database.TableObjects;
using FluentValidation;

namespace Bikevent.Validation;

public class UserValidator : AbstractValidator<BvUserRow>
{
    public UserValidator(UserDbService userDbService)
    {
        var userDbService1 = userDbService;

        const int minNickNameLength = 6;
        const int maxNickNameLength = 50;
        const int minPwdLength = 6;
        const int maxPwdLength = 50;

        RuleFor(x => x.Email).EmailAddress().WithMessage("Please enter a valid Email Address");
        RuleFor(x => x.NickName).Length(minNickNameLength, maxNickNameLength).WithMessage($"Please enter a value between {minNickNameLength} and {maxNickNameLength} characters length"); ;
        RuleFor(x => x.EncPassword).NotEmpty().Length(minPwdLength, maxPwdLength).WithMessage($"Please enter a value between {minPwdLength} and {maxPwdLength}");
        RuleFor(x => x.EncPassword).Matches("[A-Za-z0-9!@#$%^&*()_+{}[]|\\:\";'<>,.\\?/'\"\\]").WithMessage("Please use A-Z 0-9 and preferably a symbol.");

        When(x => !string.IsNullOrWhiteSpace(x.Email), () =>
        {
            RuleFor(x => x.Email).MustAsync(async (nameOf, s) =>
            {
                var res = await userDbService1.EmailExists(nameOf);
                return !res;
            }).WithMessage("Email already exists");
        });

        When(x => !string.IsNullOrWhiteSpace(x.NickName), () =>
        {
            RuleFor(x => x.NickName).MustAsync(async (nickName, s) =>
            {
                var res = await userDbService1.EmailExists(nickName);
                return !res;
            }).WithMessage("Nick Name already exists");
        });
    }
}