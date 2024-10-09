declare var $: any;
declare var jQuery: any;
declare var toastr: any;


// https://codeseven.github.io/toastr/demo.html
toastr.options = {
    "closeButton": false,
    "debug": false,
    "newestOnTop": true,
    "progressBar": true,
    "positionClass": "toast-botton-left",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
}

namespace app {

    export interface BvPage {
        init()
        addEvents()
    }

    export interface BvFormPage {
        init()
        addEvents()
        submit(e: FormDataEvent)
        validate()
    }

    export abstract class BaseFormPage {

        get form() {
            return $(".mainForm").first()
        }
        get submitButton() {
            return this.form.find("button[type=submit]").first()
        }

        get formTarget() {
            return this.form.attr("target")
        }

        init() {

            // disable default
            if (!this.form.length) alert('no form')
            if (!this.submitButton) alert('no submit')
            if (!this.formTarget) alert('no target')


            this.submitButton.off("click").on("click", this.onSubmit)

        }

        onSubmit = async (e: FormDataEvent) => {
            e.preventDefault();
            this.clearErrors()
            console.log("submitting form")
            var inputs = this.getFormInputs()
            var resp = await bvApiClient.Post(this.formTarget, inputs)
            if (!resp.success) {
                resp.data.errors.forEach(x => {
                    $(`.mainForm input[name=${x.propName}]`)
                        .after(`<div class='inputError'>${x.message}</div> `).fadeOut().fadeIn()
                })
            }
            console.log(resp)
        }

        getFormInputs(): any {
            const input: any = {};

            this.form.find("input[type=text]").each((idx: any, item: any) => {
                const jitem: any = $(item);
                const nameof: any = jitem.attr("name") + "";
                const jitemVal: any = jitem.val();
                input[nameof] = jitemVal;
            });

            this.form.find("input[type=password]").each((idx: any, item: any) => {
                const jitem = $(item);
                input[jitem.attr("name") + ""] = jitem.val();
            });

            this.form.find("input[type=hidden]").each((idx: any, item: any) => {
                const jitem = $(item);
                input[jitem.attr("name") + ""] = jitem.val();
            });

            this.form.find("textarea").each((idx: any, item: any) => {
                const jitem = $(item);
                const txt = jitem.val();
                input[jitem.attr("name") + ""] = txt;
            });
            this.form.find("select").each((idx: any, item: any) => {
                const jitem = $(item);
                input[jitem.attr("name") + ""] = jitem.val();
            });
            this.form.find("input[type=radio]:checked").each((idx: any, item: any) => {
                const jitem = $(item);
                input[jitem.attr("name") + ""] = jitem.val();
            });
            this.form.find("input[type=checkbox]").each((idx: any, item: any) => {
                const jitem = $(item);
                input[jitem.attr("name") + ""] = jitem.is(":checked") ? 1 : 0;
            });

            console.log(input)
            return input;

        }

        // utitlity : applies error messages to their respective elements
        apply_validation(validationResponse: any, form: any): void {
            $(".text-danger, .alert").remove();
            let first: any = null;
            $.each(validationResponse.Errors, (idx: any, v: any) => {
                const el = $(`#${v.PropertyName}`);
                if (idx === 0) first = el;
                const message = $(`<div class='text-danger'>${v.ErrorMessage}</div>`).hide();
                el.before(message.fadeIn().fadeOut().fadeIn());
            });
            first.focus();
        }

        clearErrors() {
            $(".inputError").remove();
        }


        randStr(len) {
            let s = '';
            while (s.length < len) s += Math.random().toString(36).substr(2, len - s.length);
            return s;
        }


        addRandomClubData() {
            let fakeId = this.randStr(5)
            let fakeClub = new club(1, `Name ${fakeId}`, `Email ${fakeId}`, new Date(), new Date(), `President ${fakeId}`);
            console.dir(fakeClub)
            for (let prop in fakeClub) {
                $("#" + prop).val(fakeClub[prop])
            }

            $("#email").val(`${fakeId}@${fakeId}.com`)
            $("#websiteUrl").val(`http://www.${fakeId}.com`)
        }
    }
}
