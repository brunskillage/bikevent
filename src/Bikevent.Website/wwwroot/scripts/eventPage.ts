module app {
    class EventPage implements BvFormPage {

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
            console.log("Init event page")
            // toastr.success("test")


        }
    }

    export let eventPage = new EventPage()
}