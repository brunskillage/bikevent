module app {
    class AddClub implements FormPage {
        addEvents() {
            throw new Error("Method not implemented.");
        }
        submit(e: FormDataEvent) {
            throw new Error("Method not implemented.");
        }
        validate() {
            throw new Error("Method not implemented.");
        }
        init() {
            console.log("Init form page")
        }
    }

    export let addClub = new AddClub()
}