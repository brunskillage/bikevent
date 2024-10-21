import { MsgSuccessA } from '../partials/wrappers/msg'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { InputB } from '../partials/wrappers/inputB';
import { Controller, get, useForm } from 'react-hook-form';
import { FormB } from '../partials/wrappers/formB';
import * as common from './../lib/common'
import { setSelectedRide } from '../store/thunks';
import { InputDate } from '../partials/wrappers/inputDate';
import { InputHidden } from '../partials/wrappers/inputHidden';
import DatePicker from 'react-datepicker';
import moment from 'moment';


export const Ride = (args) => {

    const dispatch = useDispatch()
    const ride = useSelector(state => state.club.setSelectedRide)
    const user = useSelector(state => state.user)
    const { pageMode, id } = useParams()
    const [startDate, setStartDate] = useState(new Date());
    const {
        register,
        formState: { errors },
        setError,
        setValue,
        handleSubmit,
        getValues,
        watch,
        control
    } = useForm();

    const [isCreated, setIsCreated] = useState(false)
    const [startsOn, setStartsOn] = useState(false)
    const [endsOn, setEndsOn] = useState(false)

    useEffect(() => {
        let today = moment();

    })

    // page mode change
    useEffect(() => {
        console.log('render page')
        switch (pageMode) {
            case common.PAGE_MODE_ADD: {
                // for add having no id in dispatch clears the selected club
                dispatch(setSelectedRide())
                break;
            }
            default: {
                dispatch(setSelectedRide(id))
                break;
            }
        }
    }, [pageMode])

    // data
    useEffect(() => {
        // set the react hook values if in edit mode
        if (pageMode === common.PAGE_MODE_EDIT) {
            console.log("Ride data received")
            Object.getOwnPropertyNames(ride).forEach(prop => {
                setValue(prop, ride[prop])
            })
        }
    }, [ride])

    // this
    const onSuccessFunc = (data) => {
        setIsCreated(true)
    }

    const onProcessFormData = (formData) => {
        if (!moment(formData.startsOn).isValid()) {
            formData.startsOn = null
        }

        if (!moment(formData.endsOn).isValid()) {
            formData.endsOn = null;
        }
    }

    return (<>
        <div className='ride'>
            <h3>Ride {pageMode}</h3>
            {isCreated && <>
                <MsgSuccessA>Ride {pageMode === common.PAGE_MODE_ADD ? "Added" : pageMode === common.PAGE_MODE_EDIT ? "Updated" : ""}</MsgSuccessA>
            </>}
            <FormB {...{ urlPath: "/api/v1/ride", pageMode, setError, handleSubmit, onSuccessFunc, selectorFunc: ride, getValues, get, setValue, user, onProcessFormData }}>
                <InputB label='Title *' fieldName='title' currentVal={ride?.title} {...{ pageMode, errors, register }}></InputB>
                <InputB label='Description *' fieldName="description" curentVal={ride?.description}  {...{ pageMode, errors, register }} ></InputB>
                <InputDate label='Starts On *' fieldName='startsOn' currentVal={ride?.email}  {...{ errors, register, pageMode, control }}></InputDate>
                <InputDate label='Ends On *' fieldName='endsOn' currentVal={ride?.endsOn}  {...{ errors, register, pageMode, control }}></InputDate>
                <InputB label='Start Location *' fieldName="startLocation" currentVal={ride?.startLocation}  {...{ pageMode, errors, register }} ></InputB>
                <InputB label='End Location *' fieldName="endLocation" currentVal={ride?.endLocation}  {...{ pageMode, errors, register }} ></InputB>
                <InputHidden label='User Id' fieldName="createdById" currentVal={+(user?.userId)}  {...{ pageMode, errors, register }} ></InputHidden>
            </FormB>
        </div >
    </>);
}