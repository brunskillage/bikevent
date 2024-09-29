module app {
    class AddClub implements FormPage {

        get formButton() {
            return $("#submitButton").first()
        }

        addEvents() {
            this.formButton.off("click").on("click", this.submit)
        }

        hideErrors() {
            $("[id$='-error']").hide()
        }

        showErrors(errors) {
            errors.forEach(err => {

                $("#" + err.propName + "-error").show()
                $("#" + err.propName + "-error").html(err.message)
            })
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
            this.hideErrors()
            if (!res.success) {
                $.publish(app.BvEventNames.ShowError, "Please sort out the inputs thanks!")
                this.showErrors(res.data.errors)
                return false;
            }


            $.publish(app.BvEventNames.ShowSuccess, "Club Added")



        }
        validate() {
            throw new Error("Method not implemented.");
        }
        init() {
            this.addEvents();
            console.log("Init form page")
            // toastr.success("test")


        }
    }

    export let addClub = new AddClub()
}