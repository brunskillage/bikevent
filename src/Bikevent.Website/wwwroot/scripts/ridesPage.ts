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

namespace app {
    class FormRidesPage implements BvFormPage {
        submit(e: FormDataEvent) {

        }
        validate() {

        }
        init() {
            console.log("StartingRidesAddPages")
            this.addEvents();
        }
        addEvents() {

        }
    }

    export let formRidesPage = new FormRidesPage();
}