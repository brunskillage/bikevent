module app {
    class Name__Page implements BvPage {
        init() {
            console.log("StartingName__AddPage")
            this.addEvents();
        }
        addEvents() {

        }
    }

    export let name__Page = new Name__Page();
}

module app {
    class FormName__Page implements BvFormPage {
        submit(e: FormDataEvent) {

        }
        validate() {

        }
        init() {
            console.log("StartingName__AddPages")
            this.addEvents();
        }
        addEvents() {

        }
    }

    export let formName__Page = new FormName__Page();
}