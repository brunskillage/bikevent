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
    var ClubPage = /** @class */ (function (_super) {
        __extends(ClubPage, _super);
        function ClubPage() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ClubPage.prototype.init = function () {
            _super.prototype.init.call(this);
        };
        return ClubPage;
    }(app.BaseFormPage));
    app.clubPage = new ClubPage();
})(app || (app = {}));
//# sourceMappingURL=clubPage.js.map