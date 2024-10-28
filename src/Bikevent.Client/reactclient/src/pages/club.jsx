import { MsgSuccessA } from '../partials/wrappers/msg'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { InputB } from '../partials/wrappers/inputB';
import { useForm } from 'react-hook-form';
import { FormB } from '../partials/wrappers/formB';
import * as common from './../lib/common'
import { setRegions, setSelectedClub } from './../store/thunks'
import { InputHidden } from '../partials/wrappers/inputHidden';
import { LinkButton } from '../partials/wrappers/linkButton';
import { globaldispatch, globalIsLoading, globalLocation, locationMatchesRoute } from '../lib/globalHooks';
import { SelectList } from '../partials/wrappers/selectList';


export const Club = () => {

    const dispatch = useDispatch()
    let { clubId } = useParams()
    const { register, formState: { errors }, setError, setValue, handleSubmit, getValues } = useForm();
    const user = useSelector(state => state.user)
    const club = useSelector(state => state.club.selectedClub)
    const regions = useSelector(state => state.region.regions)

    const [pageMode, setPageMode] = useState(common.VIEW_CLUB)
    const [isCreated, setIsCreated] = useState(false)

    const regionsKeyValue = regions.map(region => {
        return {
            key: region.id,
            value: region.nameOf
        }
    })

    useEffect(() => {
        console.log("render")

    }, [])

    // page mode change
    useEffect(() => {
        console.log('pagemode changed')
        setIsCreated(false)
        if (locationMatchesRoute(common.ADD_CLUB)) {
            setPageMode(common.PAGE_MODE_ADD)
            dispatch(setSelectedClub())
        }
        else if (locationMatchesRoute(common.EDIT_CLUB)) {
            setPageMode(common.PAGE_MODE_EDIT)
            dispatch(setSelectedClub(clubId))
            globaldispatch(setRegions())
        }
        else if (locationMatchesRoute(common.VIEW_CLUB)) {
            setPageMode(common.PAGE_MODE_VIEW)
            dispatch(setSelectedClub(clubId))
        }
    }, [globalLocation])

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
            <h3>Club {pageMode}: {club?.nameOf ?? "Add Club"}</h3>
            <p>
                <LinkButton path={common.VIEW_CLUBS} text="Clubs" />
                <LinkButton path={common.VIEW_RIDES_FOR_CLUB.replace(":clubId", club.id)} text="Rides" />
                {pageMode === common.PAGE_MODE_ADD && <>
                    {/* <LinkButton path={common.VIEW_CLUB.replace(":clubId", club.id)} text="View" />
                    <LinkButton path={common.EDIT_CLUB.replace(":clubId", club.id)} text="Edit" /> */}
                </>}
                {pageMode === common.PAGE_MODE_EDIT && <>
                    <LinkButton path={common.VIEW_CLUB.replace(":clubId", club.id)} text="View" />
                    <LinkButton path={common.ADD_CLUB} text="Add" />
                </>}
                {pageMode === common.PAGE_MODE_VIEW && <>
                    <LinkButton path={common.ADD_CLUB} text="Add" />
                    <LinkButton path={common.EDIT_CLUB.replace(":clubId", club.id)} text="Edit" />
                </>}
            </p >

            {isCreated && <>

                {pageMode === common.PAGE_MODE_ADD && <>
                    <MsgSuccessA>Club Added</MsgSuccessA>
                </>}
                {pageMode === common.PAGE_MODE_EDIT && <>
                    <MsgSuccessA>Club Updated</MsgSuccessA>
                </>}
                {pageMode === common.PAGE_MODE_VIEW && <>
                    <MsgSuccessA>Club Updated</MsgSuccessA>
                </>}
            </>
            }

            {
                !isCreated && !globalIsLoading &&
                <FormB {...{
                    urlPath: "/api/v1/club", pageMode, setError, handleSubmit, onSuccessFunc,
                    selectorFunc: club, getValues, setValue, user,
                    editPath: common.EDIT_CLUB.replace(":clubId", club.id),
                    addPath: common.ADD_CLUB,
                    deletePath: common.DELETE_CLUB.replace(":clubId", club.id)
                }}>
                    <InputB label='Name *' fieldName='nameOf' currentVal={club?.nameOf} {...{ pageMode, errors, register }}></InputB>
                    <InputB label='President / Leader *' fieldName="president" currentVal={club?.president}  {...{ pageMode, errors, register }} ></InputB>
                    <InputB label='Email *' fieldName='email' currentVal={club?.email}  {...{ errors, register, pageMode }}></InputB>
                    <SelectList label="Region" fieldName="region" keyValues={regionsKeyValue} {...{ errors, register, pageMode }}></SelectList>
                    <InputHidden label='User Id' fieldName="createdById" currentVal={+(user?.userId)}  {...{ pageMode, errors, register }} ></InputHidden>
                </FormB>
            }
        </div >
    </>);
}