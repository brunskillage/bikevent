"use strict";
var app;
(function (app) {
    var RidePage = /** @class */ (function () {
        function RidePage() {
        }
        RidePage.prototype.init = function () {
            console.log("StartingRideAddPage");
            this.addEvents();
        };
        RidePage.prototype.addEvents = function () {
        };
        return RidePage;
    }());
    app.ridePage = new RidePage();
})(app || (app = {}));
(function (app) {
    var FormRidePage = /** @class */ (function () {
        function FormRidePage() {
        }
        FormRidePage.prototype.submit = function (e) {
        };
        FormRidePage.prototype.validate = function () {
        };
        FormRidePage.prototype.init = function () {
            console.log("StartingRideAddPages");
            this.addEvents();
        };
        FormRidePage.prototype.addEvents = function () {
        };
        return FormRidePage;
    }());
    app.formRidePage = new FormRidePage();
})(app || (app = {}));
//# sourceMappingURL=ridePage.js.map