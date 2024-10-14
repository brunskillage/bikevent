using Bikevent.Database;
using Bikevent.Database.TableObjects;
using FluentValidation;

namespace Bikevent.Validation;

public class UserValidator : AbstractValidator<BvUserRow>
{

    public BvUserRow UserRow { get; set; }

    public UserValidator(UserDbService userDbService)
    {
        var userDbService1 = userDbService;

        const int minNickNameLength = 6;
        const int maxNickNameLength = 50;
        const int minPwdLength = 6;
        const int maxPwdLength = 50;

        RuleFor(x => x.Email).EmailAddress().WithMessage("Please enter a valid Email Address");

        RuleFor(x => x.EncPassword).Length(minPwdLength, maxPwdLength)
            .WithMessage($"Please enter a value between {minPwdLength} and {maxPwdLength}");

        RuleFor(x => x.EncPassword).Matches("[A-Za-z0-9!@#$%^&*()_+{}[]|\\:\";'<>,.\\?/'\"\\]")
            .WithMessage("Please use characters A-Z, 0-9 a symbol");

        RuleSet("Create", () =>
        {
            When(x => !string.IsNullOrWhiteSpace(x.Email), () =>
            {
                RuleFor(x => x.NickName).Length(minNickNameLength, maxNickNameLength).WithMessage(
                    $"Please enter a value between {minNickNameLength} and {maxNickNameLength} characters length");

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
        });

        RuleSet("Login", () =>
        {
            var encPassword = string.Empty;
            RuleFor(x => x.Email).MustAsync(async (email, s) =>
            {
                var res = await userDbService1.GetUserByNameOrEmail(new BvUserRow{Email = email});
                encPassword = res?.EncPassword;

                if (res != null)
                {
                    UserRow = res;
                    return true;
                }
                return false;
            }).WithMessage("Email doesnt exist");


            When(x => encPassword != null, () =>
            {
                RuleFor(x => x.EncPassword).MustAsync(async (x, s) =>
                {
                    var validPwd = BCrypt.Net.BCrypt.Verify(x, encPassword);
                    return validPwd;
                }).WithMessage("Password is Invalid");
            });
        });
    }
}