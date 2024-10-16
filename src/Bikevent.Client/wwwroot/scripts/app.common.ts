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

    // interface IConfig {
    //     Domain: string,
    //     IsDevEnvironment: boolean
    // }

    // class Config {
    //     public domain: string = "";
    //     public isDevEnvironment: boolean = false;

    //     // domain: string;
    //     // isDevEnvironment: boolean;

    //     constructor() {

    //     }

    //     async GetConfig() {
    //         let config = await bvApiClient.GetConfig()
    //         this.domain = config.domain;
    //         this.isDevEnvironment = config.isDevEnvironment;
    //         console.log(config)
    //     }
    // }

    export let config;

    export interface BvPage {
        init()
        addEvents()
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

            //if (app.config.isDevEnvironment) {
            this.apply_fakeData()
            //}

        }

        onSubmit = async (e: FormDataEvent) => {
            e.preventDefault();
            this.clearErrors()
            console.log("submitting form")
            var inputs = this.getFormInputs()
            var resp = await bvApiClient.Post(this.formTarget, inputs)
            if (!resp.success) {

                this.apply_validation(resp.data.errors)
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
        apply_validation(errors: any): void {
            $(".inputError").remove();
            let first: any = null;
            $.each(errors, (idx: any, item: any) => {
                const el = this.form.find(`input[name=${item.propName}]`)
                if (idx === 0) first = el;
                const message = $(`<div class='inputError'>${item.message}</div>`).hide();
                el.after(message.fadeIn().fadeOut().fadeIn());
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


        apply_fakeData() {
            let fakeId = this.randStr(6)
            let inputs = this.getFormInputs()
            for (let x in inputs) {
                console.log(x)
                const el = this.form.find(`input[name=${x}]`)

                if (x === 'email') {
                    el.val(`${fakeId}@fake.com`)
                    continue;
                }

                if (x === 'encPassword') {
                    el.val(`Pass123`)
                    continue;
                }

                el.val(`${x + fakeId}`)
            };
        }
    }

}