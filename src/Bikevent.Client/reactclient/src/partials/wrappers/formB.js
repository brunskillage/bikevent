import { useEffect, useState } from "react";
import axiosConfig from "../../lib/axiosConfig";
import { PAGE_MODE_ADD, PAGE_MODE_EDIT } from "../../lib/common";
import { redirect, useNavigate } from "react-router-dom";
import { clubsReducer } from "../../store/clubsSlice";
import { MsgA } from "./msg";
import { useWatch } from "react-hook-form";

export const FormB = ({ urlPath, pageMode, setError, handleSubmit, onSuccessFunc, selectorFunc, children, getValues}) => {
    
    const navigate = useNavigate()
    const [userHasInteracted, setUserHasInteracted] = useState(0)

    let [objectsTheSame, setObjectsTheSame] = useState(true)

    // on form Submission
    const onSubmit = (formData) => {
        console.log("submitting...")
        
        // the count would be 0 if not keys are presed
        setUserHasInteracted(true)

        // check the values
        if(areObjectsTheSame(formData, selectorFunc)) {
            setObjectsTheSame(true)
            return true;
        }

        setObjectsTheSame(false)

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


    const areObjectsTheSame = (obj1, obj2) => {

        let obj1Props =  Object.getOwnPropertyNames(obj1).sort();
        let obj2Props = Object.getOwnPropertyNames(obj2).sort()

        // check they are the same length
        if(obj1Props.length !== obj2Props.length) {
            console.log("The objects have different properties count")
            return false;
        }

        // check the properties
        let theSameProps = obj1Props.every((val, idx) => {
           return obj1Props[idx] === obj2Props[idx]
        })

        // they are the same check the values
        if(theSameProps){
            var propName = ""
            for(let i = 0; i< obj1Props.length;i++) {
                propName = obj1Props[i]
                if (obj2[propName] !== obj1[propName]){
                    console.log("item changed " + obj1[propName])
                    return false;
                }
            }
        }
        else {
            console.log("The objects have different properties")
            return false
        }

        return true;
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


    const setFormState = () => {
        setUserHasInteracted(true)
        let formData = getValues()
        let hasFormChanged = areObjectsTheSame(formData, selectorFunc)
        setObjectsTheSame(hasFormChanged)
    }


    return <>
        <form onSubmit={handleSubmit(onSubmit)} onKeyUp={setFormState}>
            <div className="row">
            {!!userHasInteracted && objectsTheSame && (pageMode === PAGE_MODE_EDIT || pageMode === PAGE_MODE_ADD) && <MsgA>Values have not changed</MsgA>}
            </div>
            <div className="row">
                {children}
                <div className="col c3">&nbsp;</div>
                <div className="col c14">{renderButton(pageMode)}</div>
            </div>
        </form>
    </>
}