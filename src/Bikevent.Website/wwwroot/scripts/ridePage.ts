module app {
    class RidePage implements BvPage {
        init() {
            console.log("StartingRideAddPage")
            this.addEvents();
        }
        addEvents() {

        }
    }

    export let ridePage = new RidePage();
}

module app {
    class FormRidePage implements BvFormPage {
        submit(e: FormDataEvent) {

        }
        validate() {

        }
        init() {
            console.log("StartingRideAddPages")
            this.addEvents();
        }
        addEvents() {

        }
    }

    export let formRidePage = new FormRidePage();
}