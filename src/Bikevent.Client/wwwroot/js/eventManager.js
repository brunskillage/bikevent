"use strict";
var app;
(function (app) {
    var BvEventNames;
    (function (BvEventNames) {
        BvEventNames["Request"] = "Request";
        BvEventNames["RequestWait"] = "RequestWait";
        BvEventNames["ShowError"] = "ShowError";
        BvEventNames["ShowInfo"] = "ShowInfo";
        BvEventNames["ShowSuccess"] = "ShowSuccess";
    })(BvEventNames = app.BvEventNames || (app.BvEventNames = {}));
    var EventManager = /** @class */ (function () {
        function EventManager() {
            $.subscribe(BvEventNames.ShowError, function (e, msg) {
                toastr.error(msg);
            });
            $.subscribe(BvEventNames.ShowInfo, function (e, msg) {
                toastr.info(msg);
            });
            $.subscribe(BvEventNames.ShowSuccess, function (e, msg) {
                toastr.success(msg);
            });
        }
        return EventManager;
    }());
    app.eventManager = new EventManager();
})(app || (app = {}));
//# sourceMappingURL=eventManager.js.map