import { MsgA, MsgSuccessA } from '../partials/wrappers/msg'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { InputB } from '../partials/wrappers/inputB';
import { useForm } from 'react-hook-form';
import { FormB } from '../partials/wrappers/formB';
import * as common from './../lib/common'
import { setSelectedClub } from './../store/thunks'
import { InputHidden } from '../partials/wrappers/inputHidden';


export const Club = (args) => {

    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    const club = useSelector(state => state.club.selectedClub)
    const { pageMode, id } = useParams()

    const {
        register,
        formState: { errors },
        setError,
        setValue,
        handleSubmit,
        getValues

    } = useForm();

    const [isCreated, setIsCreated] = useState(false)

    // page mode change
    useEffect(() => {
        console.log('render page')
        switch (pageMode) {
            case common.PAGE_MODE_ADD: {
                // for add having no id in dispatch clears the selected club
                dispatch(setSelectedClub())
                break;
            }
            default: {
                dispatch(setSelectedClub(id))
                break;
            }
        }
    }, [pageMode])

    // data
    useEffect(() => {
        // set the react hook values if in edit mode
        if (pageMode === common.PAGE_MODE_EDIT) {
            console.log("club data received")
            Object.getOwnPropertyNames(club).forEach(prop => {
                setValue(prop, club[prop])
            })
        }
    }, [club])

    // this
    const onSuccessFunc = (data) => {
        setIsCreated(true)
    }

    return (<>
        <div className='club'>
            <h3>Club {pageMode}</h3>
            {isCreated && <>
                <MsgSuccessA>Club {pageMode === common.PAGE_MODE_ADD ? "Added" : pageMode === common.PAGE_MODE_EDIT ? "Updated" : ""}</MsgSuccessA>
            </>}

            <FormB {...{ urlPath: "/api/v1/club", pageMode, setError, handleSubmit, onSuccessFunc, selectorFunc: club, getValues, setValue, user }}>
                <InputB label='Name *' fieldName='nameOf' currentVal={club?.nameOf} {...{ pageMode, errors, register }}></InputB>
                <InputB label='President / Leader *' fieldName="president" currentVal={club?.president}  {...{ pageMode, errors, register }} ></InputB>
                <InputB label='Email *' fieldName='email' currentVal={club?.email}  {...{ errors, register, pageMode }}></InputB>
                <InputHidden label='User Id' fieldName="createdById" currentVal={+(user?.userId)}  {...{ pageMode, errors, register }} ></InputHidden>
            </FormB>
        </div >
    </>);
}