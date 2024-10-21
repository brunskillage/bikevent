namespace app {

    export enum BvEventNames {
        Request = "Request",
        RequestWait = "RequestWait",
        ShowError = "ShowError",
        ShowInfo = "ShowInfo",
        ShowSuccess = "ShowSuccess"
    }

    class EventManager {
        constructor() {
            $.subscribe(BvEventNames.ShowError, (e, msg) => {
                toastr.error(msg)
            })
            $.subscribe(BvEventNames.ShowInfo, (e, msg) => {
                toastr.info(msg)
            })
            $.subscribe(BvEventNames.ShowSuccess, (e, msg) => {
                toastr.success(msg)
            })

        }
    }

    export let eventManager = new EventManager();
}