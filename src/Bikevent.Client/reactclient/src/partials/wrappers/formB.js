import { useEffect, useState } from "react";
import axiosConfig from "../../lib/axiosConfig";
import { areObjectsTheSame, PAGE_MODE_ADD, PAGE_MODE_EDIT, PAGE_MODE_VIEW } from "../../lib/common";
import { Button, Col, Form, Row } from "react-bootstrap";
import { LinkButton } from "./linkButton";
import { NavLink } from "react-router-dom";
import { globalNavigate } from "../../lib/globalHooks";

export const FormB = ({ urlPath, pageMode, setError, handleSubmit,
    onSuccessFunc, selectorFunc, children, getValues, defaultValues,
    setValue, user, onProcessFormData, editPath, viewPath }) => {

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
            axiosConfig.post(urlPath, formData)
                .then(handleResponse)
        }

        if (pageMode === PAGE_MODE_EDIT) {
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

    return <>
        <Form className="p-4 rounded-4 shadow " onSubmit={handleSubmit(onSubmit)} >
            {children}
            {pageMode === PAGE_MODE_VIEW ?
                <>
                    <Form.Group as={Row} className="mb-3" controlId="">
                        <Form.Label column sm="2">

                        </Form.Label>
                        <Col sm="10">
                            <LinkButton text={"Edit"} path={editPath}></LinkButton>
                        </Col>
                    </Form.Group>

                </> :
                <>
                    <Form.Group as={Row} className="mb-3" controlId="">
                        <Form.Label column sm="2">

                        </Form.Label>
                        <Col sm="10">
                            <Button type="submit">Save</Button>
                            <LinkButton text="Cancel" onClick={() => globalNavigate(-1)}></LinkButton>
                        </Col>
                    </Form.Group>
                </>
            }
        </Form>
    </>
}