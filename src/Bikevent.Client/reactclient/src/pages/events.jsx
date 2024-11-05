import { useSelector } from "react-redux";
import { ADD_EVENT_TO_CLUB, VIEW_CLUB } from "../lib/common";
import { LinkButton } from "../partials/wrappers/linkButton";
import { PageTitle } from "../partials/wrappers/pageTitle";
import { useEffect } from "react";
import { setClubEvents } from "../store/thunks";
import { globaldispatch } from "../lib/globalHooks";
import { LoadingA } from "../partials/wrappers/loading";
import { EventListItem } from "../partials/eventListItem";
import { PageContainer } from "../partials/wrappers/pageContainer";

export const Events = (args) => {


    var util = useSelector(state => state.util)
    var club = useSelector(state => state.club.selectedClub)
    var events = useSelector(state => state.event.events)

    useEffect(() => {
        if (club?.id) {
            globaldispatch(setClubEvents(club.id));
        }
    }, [])

    return (<>
        <div className='eventsPage'>
            <PageTitle title={("Events for " + club?.nameOf)}>
                <LinkButton path={VIEW_CLUB.replace(":clubId", club.id)} text="Club Page"></LinkButton>
                <LinkButton path={ADD_EVENT_TO_CLUB.replace(":clubId", club.id)} text="Add"></LinkButton>
            </PageTitle>

            <PageContainer>
                <LoadingA isLoading={util?.loading}></LoadingA>
                {events && events.length ? <>
                    <div className='events'>
                        {events.map(event => {
                            return <EventListItem key={event.id} {...event}></EventListItem>
                        })}
                    </div>
                </> : <>
                    <p>No rides found</p>
                </>}
            </PageContainer>
        </div>
    </>);
}