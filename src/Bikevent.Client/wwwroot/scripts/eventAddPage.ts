namespace app {
    class EventAddPage implements BvPage {
        init() {
            console.log("Starting EventAddPage")


            this.addEvents();
        }
        addEvents() {
            throw new Error("Method not implemented.");
        }
    }

    export let eventAddPage = new EventAddPage();
}