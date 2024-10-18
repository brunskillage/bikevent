import { useEffect, useState } from "react";
import axiosConfig from "../../lib/axiosConfig";
import { PAGE_MODE_ADD, PAGE_MODE_EDIT } from "../../lib/common";
import { redirect, useNavigate } from "react-router-dom";

export const FormB = ({ urlPath, pageMode, setError, handleSubmit, onSuccessFunc, children}) => {
    
    const navigate = useNavigate()

    const onSubmit = (formData) => {
        if(pageMode === PAGE_MODE_ADD){
            // serverside check values and save new
            axiosConfig.post(urlPath, formData)
                .then(handleResponse)
        }
        if(pageMode === PAGE_MODE_EDIT){
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

    const onEditClick = () => {
        navigate(`${window.location.pathname}/edit`)
    }

    const renderButton= (pageMode) => {
        switch (pageMode) {
            case PAGE_MODE_ADD: {
                return <input className='btn btn-a btn-sm' type="submit" value="Add"/>
            }
            case PAGE_MODE_EDIT: {
                return <input className='btn btn-a btn-sm' type="submit" value="Save"/>
            }
            default:
                return <button className='btn btn-a btn-sm' onClick={onEditClick}>Edit</button>
        }

    }

    return <>
    
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
                {children}
                <div className="col c3">&nbsp;</div>
                <div className="col c14">{renderButton(pageMode)}</div>
            </div>
        </form>
    </>

}