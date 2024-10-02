"use strict";
var app;
(function (app) {
    var EventsPage = /** @class */ (function () {
        function EventsPage() {
        }
        EventsPage.prototype.addEvents = function () {
        };
        EventsPage.prototype.init = function () {
            this.addEvents();
            console.log("Init Events page");
        };
        return EventsPage;
    }());
    app.eventsPage = new EventsPage();
})(app || (app = {}));
//# sourceMappingURL=eventsPage.js.map