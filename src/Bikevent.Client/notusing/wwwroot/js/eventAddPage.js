"use strict";
var app;
(function (app) {
    var EventAddPage = /** @class */ (function () {
        function EventAddPage() {
        }
        EventAddPage.prototype.init = function () {
            console.log("Starting EventAddPage");
            this.addEvents();
        };
        EventAddPage.prototype.addEvents = function () {
            throw new Error("Method not implemented.");
        };
        return EventAddPage;
    }());
    app.eventAddPage = new EventAddPage();
})(app || (app = {}));
//# sourceMappingURL=eventAddPage.js.map