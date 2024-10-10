namespace app {
    class RidesPage implements BvPage {
        init() {
            console.log("StartingRidesAddPage")
            this.addEvents();
        }
        addEvents() {

        }
    }

    export let ridesPage = new RidesPage();
}