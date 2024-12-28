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
import { PageTitle } from '../partials/wrappers/pageTitle';
import { SelectList2 } from '../partials/wrappers/selectList2';
import { SubMenu } from '../partials/wrappers/subMenu';
import { ModalB } from '../partials/wrappers/modalB';
import { PageContainer } from '../partials/wrappers/pageContainer'
import { toTitleCase } from '../lib/localStorageClient';
import { CheckMark, Edit } from '../partials/wrappers/icons';
import { Col, Container, Row } from 'react-bootstrap';
import { ClubLogo } from '../partials/wrappers/clubLogo';
import { ClubHeader } from '../partials/wrappers/clubHeader';


export const Club = () => {

    const dispatch = useDispatch()
    let { clubId } = useParams()
    const { register,
        formState: { errors },
        setError,
        setValue,
        handleSubmit,
        getValues,
        reset,
        control } = useForm({
            defaultValues: {
                nameOf: "",
                president: "",
                region: "",
                email: ""
            }
        });

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

    // page mode change
    useEffect(() => {
        console.log('pagemode changed to ' + pageMode)

        setIsCreated(false)

        if (!regions.length) {
            globaldispatch(setRegions())
        }

        if (locationMatchesRoute(common.ADD_CLUB)) {
            setPageMode(common.PAGE_MODE_ADD)
            dispatch(setSelectedClub())
            reset()
        }
        else if (locationMatchesRoute(common.EDIT_CLUB)) {
            setPageMode(common.PAGE_MODE_EDIT)
            dispatch(setSelectedClub(clubId))
        }
        else if (locationMatchesRoute(common.VIEW_CLUB)) {
            setPageMode(common.PAGE_MODE_VIEW)
            dispatch(setSelectedClub(clubId))
        }
    }, [globalLocation])

    // data
    useEffect(() => {
        // set the react hook values if in edit mode
        if (club) {
            console.log("club data received")
            Object.getOwnPropertyNames(club).forEach(prop => {
                setValue(prop, club[prop])
            })
        }
        else {

        }
    }, [club])

    // this
    const onSuccessFunc = (resp) => {
        setIsCreated(true)

        if (pageMode === common.PAGE_MODE_ADD) {
            dispatch(setSelectedClub(resp?.data?.data?.id))

            // globalNavigate(common.VIEW_CLUB.replace(":clubId", resp?.data?.data?.id))
        }
        if (pageMode === common.PAGE_MODE_EDIT) {
            dispatch(setSelectedClub(club.id))
            //globalNavigate(common.VIEW_CLUB.replace(":clubId", club.id))
        }
    }



    return (<>
        <PageContainer>
            <PageTitle>
                <ClubHeader club={club}></ClubHeader>
            </PageTitle>

            <SubMenu>
                <LinkButton path={common.VIEW_CLUBS} text="All Clubs" />
                {pageMode === common.PAGE_MODE_ADD && <>
                </>}
                {pageMode === common.PAGE_MODE_EDIT && <>
                    <LinkButton path={common.VIEW_CLUB.replace(":clubId", clubId)} text="View" />
                </>}
                {pageMode === common.PAGE_MODE_VIEW && <>
                    <LinkButton path={common.ADD_CLUB} text="+Add" />
                </>}
                <LinkButton path={common.VIEW_RIDES_FOR_CLUB.replace(":clubId", clubId)} text="Rides" />
                <LinkButton path={common.VIEW_EVENTS_FOR_CLUB.replace(":clubId", clubId)} text="Events" />
            </SubMenu>

            {isCreated && <ModalB isVisible={true} headerText='Success'
                handleOnClose={() => { setIsCreated(false) }}><CheckMark /> Club Saved</ModalB>}
            {!globalIsLoading &&
                <FormB {...{
                    urlPath: "/api/v1/club", pageMode, setError, handleSubmit, onSuccessFunc,
                    selectorFunc: club, getValues, setValue, user, reset,
                    editPath: common.EDIT_CLUB.replace(":clubId", club?.id),
                    addPath: common.ADD_CLUB,
                    deletePath: common.DELETE_CLUB.replace(":clubId", club?.id),
                    viewPath: common.VIEW_CLUB.replace(":clubId", club?.id),
                }}>
                    {/* <InputB label='Name *' fieldName='nameOf' currentVal={club?.nameOf} {...{ pageMode, errors, register, control }}></InputB> */}
                    <InputB label='President / Leader *' fieldName="president" currentVal={club?.president}  {...{ pageMode, errors, register, control }} ></InputB>
                    <SelectList2 label="Region *" fieldName="regionId" keyValues={regionsKeyValue} currentVal={club?.regionId} {...{ errors, register, pageMode, control }}></SelectList2>
                    <InputB label='Email *' fieldName='email' currentVal={club?.email}  {...{ errors, register, pageMode, control }}></InputB>
                    <InputHidden label='User Id' fieldName="createdById" currentVal={+(user?.userId)}  {...{ pageMode, errors, register, control }} ></InputHidden>
                </FormB>
            }</PageContainer>
    </>);
}
