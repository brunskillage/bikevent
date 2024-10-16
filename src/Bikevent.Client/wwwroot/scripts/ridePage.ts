namespace app {
    class RidePage extends BaseFormPage {
        init() {
            super.init()
            var dateSelect = new DateTimeSelect()
            dateSelect.init()
        }
    }

    export let ridePage = new RidePage();


}

namespace app {


    export class DateTimeSelect {

        days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

        selectedDay: number = 0;
        selectableOptions: string[] = [];

        get daySelector() {
            return $("form").find("#dayPicker").first()
        }
        get dateSelector() {
            return $("form").find("#datePicker").first()
        }

        init() {
            console.log("date selector intitialised....")
            this.daySelector.off("change").on("change", this.onSelectDay.bind(this))
            this.daySelector.trigger("change")
        }

        onSelectDay = (e) => {
            e.preventDefault()
            this.selectedDay = +(this.daySelector.val());
            var today = new Date()
            this.selectableOptions = []

            for (let index = 1; index < 365; ++index) {
                var testDate = new Date(new Date().setDate(today.getDate() + index)
                );
                if (testDate.getDay() === this.selectedDay) (
                    this.selectableOptions.push(testDate.toISOString())
                )
            }

            var pickHtml = ""
            this.selectableOptions.forEach(item => {
                pickHtml += `<option value='${item}'>${new Date(item).toString().substring(0, 15)}</option>`
            })


            this.dateSelector.html(pickHtml)
        }
    }


}