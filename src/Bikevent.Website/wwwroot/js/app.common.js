"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
// https://codeseven.github.io/toastr/demo.html
toastr.options = {
    "closeButton": false,
    "debug": false,
    "newestOnTop": true,
    "progressBar": true,
    "positionClass": "toast-botton-left",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
};
var app;
(function (app) {
    var BaseFormPage = /** @class */ (function () {
        function BaseFormPage() {
            var _this = this;
            this.onSubmit = function (e) { return __awaiter(_this, void 0, void 0, function () {
                var inputs, resp;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            e.preventDefault();
                            this.clearErrors();
                            console.log("submitting form");
                            inputs = this.getFormInputs();
                            return [4 /*yield*/, app.bvApiClient.Post(this.formTarget, inputs)];
                        case 1:
                            resp = _a.sent();
                            if (!resp.success) {
                                resp.data.errors.forEach(function (x) {
                                    $(".mainForm input[name=".concat(x.propName, "]"))
                                        .after("<div class='inputError'>".concat(x.message, "</div> ")).fadeOut().fadeIn();
                                });
                            }
                            console.log(resp);
                            return [2 /*return*/];
                    }
                });
            }); };
        }
        Object.defineProperty(BaseFormPage.prototype, "form", {
            get: function () {
                return $(".mainForm").first();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(BaseFormPage.prototype, "submitButton", {
            get: function () {
                return this.form.find("button[type=submit]").first();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(BaseFormPage.prototype, "formTarget", {
            get: function () {
                return this.form.attr("target");
            },
            enumerable: false,
            configurable: true
        });
        BaseFormPage.prototype.init = function () {
            // disable default
            if (!this.form.length)
                alert('no form');
            if (!this.submitButton)
                alert('no submit');
            if (!this.formTarget)
                alert('no target');
            this.submitButton.off("click").on("click", this.onSubmit);
        };
        BaseFormPage.prototype.getFormInputs = function () {
            var input = {};
            this.form.find("input[type=text]").each(function (idx, item) {
                var jitem = $(item);
                var nameof = jitem.attr("name") + "";
                var jitemVal = jitem.val();
                input[nameof] = jitemVal;
            });
            this.form.find("input[type=password]").each(function (idx, item) {
                var jitem = $(item);
                input[jitem.attr("name") + ""] = jitem.val();
            });
            this.form.find("input[type=hidden]").each(function (idx, item) {
                var jitem = $(item);
                input[jitem.attr("name") + ""] = jitem.val();
            });
            this.form.find("textarea").each(function (idx, item) {
                var jitem = $(item);
                var txt = jitem.val();
                input[jitem.attr("name") + ""] = txt;
            });
            this.form.find("select").each(function (idx, item) {
                var jitem = $(item);
                input[jitem.attr("name") + ""] = jitem.val();
            });
            this.form.find("input[type=radio]:checked").each(function (idx, item) {
                var jitem = $(item);
                input[jitem.attr("name") + ""] = jitem.val();
            });
            this.form.find("input[type=checkbox]").each(function (idx, item) {
                var jitem = $(item);
                input[jitem.attr("name") + ""] = jitem.is(":checked") ? 1 : 0;
            });
            console.log(input);
            return input;
        };
        // utitlity : applies error messages to their respective elements
        BaseFormPage.prototype.apply_validation = function (validationResponse, form) {
            $(".text-danger, .alert").remove();
            var first = null;
            $.each(validationResponse.Errors, function (idx, v) {
                var el = $("#".concat(v.PropertyName));
                if (idx === 0)
                    first = el;
                var message = $("<div class='text-danger'>".concat(v.ErrorMessage, "</div>")).hide();
                el.before(message.fadeIn().fadeOut().fadeIn());
            });
            first.focus();
        };
        BaseFormPage.prototype.clearErrors = function () {
            $(".inputError").remove();
        };
        BaseFormPage.prototype.randStr = function (len) {
            var s = '';
            while (s.length < len)
                s += Math.random().toString(36).substr(2, len - s.length);
            return s;
        };
        BaseFormPage.prototype.addRandomClubData = function () {
            var fakeId = this.randStr(5);
            var fakeClub = new club(1, "Name ".concat(fakeId), "Email ".concat(fakeId), new Date(), new Date(), "President ".concat(fakeId));
            console.dir(fakeClub);
            for (var prop in fakeClub) {
                $("#" + prop).val(fakeClub[prop]);
            }
            $("#email").val("".concat(fakeId, "@").concat(fakeId, ".com"));
            $("#websiteUrl").val("http://www.".concat(fakeId, ".com"));
        };
        return BaseFormPage;
    }());
    app.BaseFormPage = BaseFormPage;
})(app || (app = {}));
//# sourceMappingURL=app.common.js.map