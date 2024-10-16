namespace app {
    class EventsPage implements BvPage {

        addEvents() {

        }

        init() {
            this.addEvents();
            console.log("Init Events page")

        }
    }

    export let eventsPage = new EventsPage()
}