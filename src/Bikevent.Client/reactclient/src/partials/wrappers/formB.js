import { useState } from "react";
import axiosConfig from "../../lib/axiosConfig";
import { areObjectsTheSame, PAGE_MODE_ADD, PAGE_MODE_EDIT } from "../../lib/common";

export const FormB = ({ urlPath, pageMode, setError, handleSubmit,
    onSuccessFunc, selectorFunc, children, getValues, getValue,
    setValue, user, onProcessFormData, editPath, addPath, deletePath }) => {

    const [userHasInteracted, setUserHasInteracted] = useState(0)
    const [objectsTheSame, setObjectsTheSame] = useState(true)

    // on form Submission
    const onSubmit = (formData) => {
        console.log("submitting...")

        // run any supplied function
        if (typeof onProcessFormData === 'function') {
            onProcessFormData(formData)
        }

        // react hook forms
        setValue("userId", user.userId)
        // the count would be 0 if not keys are presed
        setUserHasInteracted(true)

        // check the values
        if (pageMode === PAGE_MODE_EDIT && areObjectsTheSame(formData, selectorFunc)) {
            setObjectsTheSame(true)
            return true;
        }

        setObjectsTheSame(false)

        if (pageMode === PAGE_MODE_ADD) {
            // serverside check values and save new

            axiosConfig.post(urlPath, formData)
                .then(handleResponse)
        }
        if (pageMode === PAGE_MODE_EDIT) {
            // serverside check values and save new
            axiosConfig.patch(urlPath, formData)
                .then(handleResponse)
        }
    }


    const handleResponse = (resp) => {
        if (!resp?.data?.success) {
            resp?.data?.data?.errors?.forEach(err => {
                // add to the react hook errors list
                setError(err.propName, { type: 'manual', message: err.message })
            })
            return false;
        }
        onSuccessFunc(resp)
        return true;
    }

    const handleOnKeyUp = () => {
        if (pageMode === PAGE_MODE_EDIT || pageMode === PAGE_MODE_ADD) {
            console.log("keypress")
            setUserHasInteracted(true)
            let formData = getValues()
            let hasFormChanged = areObjectsTheSame(formData, selectorFunc)
            setObjectsTheSame(hasFormChanged)
        }
    }

    const shouldDisplay = () => {
        const shouldDisplay = !!userHasInteracted && !objectsTheSame && (pageMode === PAGE_MODE_EDIT || pageMode === PAGE_MODE_ADD)
        return shouldDisplay
    }

    return <>
        <form onSubmit={handleSubmit(onSubmit)} onChange={handleOnKeyUp}>
            <div className="row">
                {children}
            </div>
            {shouldDisplay() &&
                <div className="row">
                    <div className="col c3">&nbsp;</div>
                    <div className="col c14">
                        <input className="btn btn-a btn-sm" type="submit" value="Save" />
                    </div>
                </div>}
        </form>
    </>
}