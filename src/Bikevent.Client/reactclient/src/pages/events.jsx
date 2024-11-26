import { useSelector } from "react-redux";
import { ADD_EVENT_TO_CLUB, VIEW_CLUB } from "../lib/common";
import { LinkButton } from "../partials/wrappers/linkButton";
import { PageTitle } from "../partials/wrappers/pageTitle";
import { SubMenu } from "./../partials/wrappers/subMenu"
import { useEffect } from "react";
import { setClubEvents } from "../store/thunks";
import { globaldispatch } from "../lib/globalHooks";
import { LoadingA } from "../partials/wrappers/loading";
import { EventListItem } from "../partials/eventListItem";
import { PageContainer } from "../partials/wrappers/pageContainer";
import { useParams } from "react-router-dom";

export const Events = (args) => {

    let { clubId } = useParams()
    var util = useSelector(state => state.util)
    var club = useSelector(state => state.club.selectedClub)
    var events = useSelector(state => state.event.events)


    useEffect(() => {
        if (clubId) {
            globaldispatch(setClubEvents(clubId));
        }
    }, [])

    return (<>
        <div className='eventsPage'>
            <PageTitle >{("Events for " + club?.nameOf)}</PageTitle>
            <SubMenu>
                <LinkButton path={VIEW_CLUB.replace(":clubId", club.id)} text="Club Page"></LinkButton>
                <LinkButton path={ADD_EVENT_TO_CLUB.replace(":clubId", club.id)} text="+New"></LinkButton>
            </SubMenu>

            <PageContainer>
                <LoadingA isLoading={util?.loading}></LoadingA>
                {!util?.loading && events && events.length ? <>
                    <div className='events'>

                        <table className="table table-responsive align-middle">
                            <thead>
                                <th>When</th>
                                <th>More</th>
                                <th></th>
                            </thead>
                            <tbody>
                                {events.map(event => {
                                    return <EventListItem key={event.id} {...event}></EventListItem>
                                })}
                            </tbody>
                        </table>


                    </div>
                </> : <>
                    <p>No events found</p>
                </>}
            </PageContainer>
        </div>
    </>);
}