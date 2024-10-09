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
    var RidePage = /** @class */ (function (_super) {
        __extends(RidePage, _super);
        function RidePage() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        RidePage.prototype.init = function () {
            _super.prototype.init.call(this);
            var dateSelect = new app.DateTimeSelect();
            dateSelect.init();
        };
        return RidePage;
    }(app.BaseFormPage));
    app.ridePage = new RidePage();
})(app || (app = {}));
(function (app) {
    var DateTimeSelect = /** @class */ (function () {
        function DateTimeSelect() {
            var _this = this;
            this.days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
            this.selectedDay = 0;
            this.selectableOptions = [];
            this.onSelectDay = function (e) {
                e.preventDefault();
                _this.selectedDay = +(_this.daySelector.val());
                var today = new Date();
                _this.selectableOptions = [];
                for (var index = 1; index < 365; ++index) {
                    var testDate = new Date(new Date().setDate(today.getDate() + index));
                    if (testDate.getDay() === _this.selectedDay)
                        (_this.selectableOptions.push(testDate.toISOString()));
                }
                var pickHtml = "";
                _this.selectableOptions.forEach(function (item) {
                    pickHtml += "<option value='".concat(item, "'>").concat(new Date(item).toString().substring(0, 15), "</option>");
                });
                _this.dateSelector.html(pickHtml);
            };
        }
        Object.defineProperty(DateTimeSelect.prototype, "daySelector", {
            get: function () {
                return $("form").find("#dayPicker").first();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(DateTimeSelect.prototype, "dateSelector", {
            get: function () {
                return $("form").find("#datePicker").first();
            },
            enumerable: false,
            configurable: true
        });
        DateTimeSelect.prototype.init = function () {
            console.log("date selector intitialised....");
            this.daySelector.off("change").on("change", this.onSelectDay.bind(this));
            this.daySelector.trigger("change");
        };
        return DateTimeSelect;
    }());
    app.DateTimeSelect = DateTimeSelect;
})(app || (app = {}));
//# sourceMappingURL=ridePage.js.map