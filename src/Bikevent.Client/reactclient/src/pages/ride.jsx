import { MsgSuccessA } from '../partials/wrappers/msg'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { InputB } from '../partials/wrappers/inputB';
import { get, useForm } from 'react-hook-form';
import { FormB } from '../partials/wrappers/formB';
import * as common from '../lib/common'
import { setSelectedClub, setSelectedRide } from '../store/thunks';
import { InputDate } from '../partials/wrappers/inputDate';
import { InputHidden } from '../partials/wrappers/inputHidden';
import moment from 'moment';
import { globalLocation, globalNavigate, locationMatchesRoute } from '../lib/globalHooks';
import { LinkButton } from '../partials/wrappers/linkButton';


export const Ride = (args) => {

    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    const ride = useSelector(state => state.ride.selectedRide)
    const club = useSelector(state => state.club.selectedClub)
    const {
        register,
        formState: { errors },
        setError,
        setValue,
        handleSubmit,
        getValues,
        reset,
        control
    } = useForm();

    const { clubId, rideId } = useParams()
    const [pageMode, setPageMode] = useState(common.VIEW_CLUB)
    const [isCreated, setIsCreated] = useState(false)

    useEffect(() => {
        console.log('pagemode changed')
        setIsCreated(false)
        if (locationMatchesRoute(common.ADD_RIDE_TO_CLUB)) {
            setPageMode(common.PAGE_MODE_ADD)
            reset()
            dispatch(setSelectedRide())
            dispatch(setSelectedClub(clubId))
        }
        else if (locationMatchesRoute(common.EDIT_RIDE_FOR_CLUB)) {
            setPageMode(common.PAGE_MODE_EDIT)
            dispatch(setSelectedRide(rideId))
            dispatch(setSelectedClub(clubId))
        }
        else if (locationMatchesRoute(common.VIEW_RIDE_FOR_CLUB)) {
            setPageMode(common.PAGE_MODE_VIEW)
            dispatch(setSelectedRide(rideId))
            dispatch(setSelectedClub(clubId))
        }
    }, [globalLocation])

    // // data
    useEffect(() => {
        // set the react hook values if in edit mode
        console.log(club)
        console.log(ride)
        if (pageMode === common.PAGE_MODE_EDIT || pageMode === common.PAGE_MODE_VIEW) {
            console.log("Ride data received")
            Object.getOwnPropertyNames(ride).forEach(prop => {
                setValue(prop, ride[prop])
            })
        }
    }, [club, ride])


    // this
    const onSuccessFunc = (data) => {
        // globalNavigate(common.VIEW_RIDE_FOR_CLUB.replace(":clubId", ride.clubId).replace(":rideId", ride.id))
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
            <h3>Ride {pageMode}: {ride?.title ?? "New Ride"}</h3>
            {club && <>
                <p><b>For {club.nameOf}</b></p>
                <div>
                    <LinkButton path={common.VIEW_RIDES_FOR_CLUB.replace(":clubId", ride.clubId)} text="Rides" />
                    {pageMode !== common.PAGE_MODE_ADD && <>
                        <LinkButton path={common.EDIT_RIDE_FOR_CLUB.replace(":clubId", ride.clubId).replace(":rideId", ride.id)} text="Edit" />
                        <LinkButton path={common.VIEW_RIDE_FOR_CLUB.replace(":clubId", ride.clubId).replace(":rideId", ride.id)} text="View" />
                    </>}
                    <LinkButton path={common.ADD_RIDE_TO_CLUB.replace(":clubId", ride.clubId).replace(":rideId", ride.id)} text="Add" />
                </div></>}
            {isCreated && <>
                <MsgSuccessA>Ride {ride?.title} Updated</MsgSuccessA>
            </>}
            <FormB {...{
                urlPath: "/api/v1/ride", pageMode, setError, handleSubmit, onSuccessFunc,
                selectorFunc: ride, getValues, get, setValue, user, onProcessFormData,
                editPath: common.EDIT_RIDE_FOR_CLUB.replace(":clubId", ride.clubId).replace(":rideId", ride.id),
                addPath: common.ADD_RIDE_TO_CLUB.replace(":clubId", ride.clubId),
                deletePath: common.DELETE_RIDE_FROM_CLUB.replace(":clubId", ride.clubId).replace(":rideId", ride.id)

            }}>
                <InputB label='Title *' fieldName='title' currentVal={ride?.title} {...{ pageMode, errors, register }}></InputB>
                <InputB label='Description *' fieldName="description" currentVal={ride?.description}  {...{ pageMode, errors, register }} ></InputB>
                <InputDate label='Starts On *' fieldName='startsOn' currentVal={ride?.startsOn}  {...{ errors, register, pageMode, control }}></InputDate>
                <InputDate label='Ends On *' fieldName='endsOn' currentVal={ride?.endsOn}  {...{ errors, register, pageMode, control }}></InputDate>
                <InputB label='Start Location *' fieldName="startLocation" currentVal={ride?.startLocation}  {...{ pageMode, errors, register }} ></InputB>
                <InputB label='End Location *' fieldName="endLocation" currentVal={ride?.endLocation}  {...{ pageMode, errors, register }} ></InputB>
                <InputHidden label='User Id' fieldName="createdById" currentVal={+(user?.userId)}  {...{ pageMode, errors, register }} ></InputHidden>
                <InputHidden label='Club Id' fieldName="clubId" currentVal={+(clubId ?? 0)}  {...{ pageMode, errors, register }} ></InputHidden>
            </FormB>
        </div >
    </>);
}