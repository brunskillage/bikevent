import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { InputB } from '../partials/wrappers/inputB';
import { get, useForm } from 'react-hook-form';
import { FormB } from '../partials/wrappers/formB';
import * as common from '../lib/common'
import { setSelectedClub, setSelectedEvent } from '../store/thunks';
import { InputDate } from '../partials/wrappers/inputDate';
import { InputHidden } from '../partials/wrappers/inputHidden';
import moment from 'moment';
import { globalLocation, locationMatchesRoute } from '../lib/globalHooks';
import { LinkButton } from '../partials/wrappers/linkButton';
import { PageTitle } from '../partials/wrappers/pageTitle';
import { MsgA } from '../partials/wrappers/msg';
import { PageContainer } from '../partials/wrappers/pageContainer';
import { SubMenu } from '../partials/wrappers/subMenu';


export const Event = (args) => {

    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    const event = useSelector(state => state.event.selectedEvent)
    const club = useSelector(state => state.club.selectedClub)
    const {
        register,
        formState: { errors, defaultValues },
        setError,
        setValue,
        handleSubmit,
        getValues,
        reset,
        control
    } = useForm();
    const location = useLocation()
    const { clubId, eventId } = useParams()
    const [pageMode, setPageMode] = useState(common.VIEW_CLUB)
    const [isCreated, setIsCreated] = useState(false)

    // // data
    useEffect(() => {
        if (pageMode === common.PAGE_MODE_EDIT)
            if (event) {
                // populate react hook form from state
                Object.getOwnPropertyNames(event).forEach(prop => {
                    setValue(prop, event[prop])
                })
            }

    }, [pageMode, event])

    useEffect(() => {
        setIsCreated(false)
        if (locationMatchesRoute(common.ADD_EVENT_TO_CLUB)) {
            setPageMode(common.PAGE_MODE_ADD)
            dispatch(setSelectedEvent())
            dispatch(setSelectedClub(clubId))
            reset()
        }
        else if (locationMatchesRoute(common.EDIT_EVENT_FOR_CLUB)) {
            setPageMode(common.PAGE_MODE_EDIT)
            dispatch(setSelectedEvent(eventId))
            dispatch(setSelectedClub(clubId))
        }
        else if (locationMatchesRoute(common.VIEW_EVENT_FOR_CLUB)) {
            setPageMode(common.PAGE_MODE_VIEW)
            dispatch(setSelectedEvent(eventId))
            dispatch(setSelectedClub(clubId))
        }
        console.log('pagemode changed to ' + pageMode)
    }, [globalLocation])

    // this
    const onSuccessFunc = (data) => {
        // globalNavigate(common.VIEW_EVENT_FOR_CLUB.replace(":clubId", event.clubId).replace(":eventId", eventId))
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

    const getTitle = () => {
        return `${club.nameOf} : ${pageMode === common.PAGE_MODE_EDIT ? "Edit " + event?.title : "New Event"}`
    }

    return (<>

        <div className='eventPage'>

            <PageTitle >{getTitle()}</PageTitle>
            <SubMenu>
                <LinkButton path={common.VIEW_EVENTS_FOR_CLUB.replace(":clubId", clubId)} text="Events" />
                {pageMode === common.PAGE_MODE_VIEW && <>
                    <LinkButton path={common.EDIT_EVENT_FOR_CLUB.replace(":clubId", clubId).replace(":eventId", eventId)} text="Edit" />
                    <LinkButton path={common.ADD_EVENT_TO_CLUB.replace(":clubId", clubId).replace(":eventId", eventId)} text="Add" />
                </>}
                {pageMode === common.PAGE_MODE_EDIT && <>
                    <LinkButton path={common.VIEW_EVENT_FOR_CLUB.replace(":clubId", clubId).replace(":eventId", eventId)} text="View" />
                </>}
            </SubMenu>

            <PageContainer>
                {club && <>
                    <div>

                    </div></>}
                {isCreated && <>
                    <MsgA variant={"success"}>Ride {event?.title} Updated</MsgA>
                </>}

                <FormB {...{
                    urlPath: "/api/v1/event", pageMode, setError, handleSubmit, onSuccessFunc,
                    selectorFunc: event, getValues, get, setValue, user, onProcessFormData,
                    editPath: common.EDIT_EVENT_FOR_CLUB.replace(":clubId", clubId).replace(":eventId", eventId),
                    addPath: common.ADD_EVENT_TO_CLUB.replace(":clubId", clubId),
                    deletePath: common.DELETE_EVENT_FROM_CLUB.replace(":clubId", clubId).replace(":eventId", eventId),
                    viewPath: common.VIEW_EVENT_FOR_CLUB.replace(":eventId", eventId)
                }}>
                    <InputB label='Title *' fieldName='title' currentVal={event?.title} {...{ pageMode, errors, register, control }}></InputB>
                    <InputB label='Description' fieldName="descriptionOf" currentVal={event?.descriptionOf}  {...{ pageMode, errors, register, control }} ></InputB>
                    <InputB label='Location *' fieldName="location" currentVal={event?.location}  {...{ pageMode, errors, register, control }} ></InputB>
                    <InputDate label='Start Time *' fieldName='startsOn' currentVal={event?.startsOn}  {...{ errors, register, pageMode, control, reset, setValue }}></InputDate>
                    <InputDate label='End Time' fieldName='endsOn' currentVal={event?.endsOn}  {...{ errors, register, pageMode, control, reset, setValue }}></InputDate>
                    <InputB label='Link Url' fieldName='linkUrl' currentVal={event?.linkUrl}  {...{ errors, register, pageMode, control, reset }}></InputB>
                    <InputHidden label='User Id' fieldName="createdById" currentVal={+(user?.userId)}  {...{ pageMode, errors, register, control }} ></InputHidden>
                    <InputHidden label='Club Id' fieldName="clubId" currentVal={+(clubId ?? 0)}  {...{ pageMode, errors, register, control }} ></InputHidden>   {/* */}
                </FormB>
            </PageContainer>

        </div >

    </>);
}