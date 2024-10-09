"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var app;
(function (app) {
    var UserPage = /** @class */ (function (_super) {
        __extends(UserPage, _super);
        function UserPage() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        UserPage.prototype.init = function () {
            _super.prototype.init.call(this);
        };
        return UserPage;
    }(app.BaseFormPage));
    app.userPage = new UserPage();
})(app || (app = {}));
//# sourceMappingURL=userPage.js.map