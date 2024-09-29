module app {
    class AddClub implements FormPage {

        get formButton() {
            return $("#submitButton").first()
        }

        addEvents() {
            this.formButton.off("click").on("click", this.submit)
        }
        submit = async (e: FormDataEvent) => {
            e.preventDefault()
            var data = $("#mainForm").serializeArray()
            var dataObj = {}
            data.forEach((item) => {
                dataObj[item.name] = item.value
            });

            //const formData = new FormData(new FormData(document.querySelector("my-awesome-dropzone")) as HTMLFormElement);

            // console.log(new FormData(form))

            var res = await bvApiClient.AddClub(dataObj as club)
            $.publish(app.BvEventNames.ShowSuccess, "Are you ok?")



        }
        validate() {
            throw new Error("Method not implemented.");
        }
        init() {
            this.addEvents();
            console.log("Init form page")
            // toastr.success("test")
            $.publish(app.BvEventNames.ShowSuccess, "Add a club")

        }
    }

    export let addClub = new AddClub()
}