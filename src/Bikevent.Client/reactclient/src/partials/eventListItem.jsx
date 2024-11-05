import moment from "moment"
import { VIEW_EVENT_FOR_CLUB } from "../lib/common"
import { LinkButton } from "./wrappers/linkButton"
import bikeLogo from "../assets/Bike3.png"

export const EventListItem = (props) => {
    return <>
        <div className="row>">
            <div className="eventListItem">

                <div className="col c2 timeboxCol">
                    <div className="timeBox">{moment(props.startsOn).fromNow(true)}</div>
                </div>
                <div className="col c8 summaryCol">
                    <div className="title"><h3>{props.title}</h3></div>
                    <div className="date">
                        {moment(props.startsOn).format("h:mma, ddd Do MMM")}
                    </div>
                </div>
                <div className="col c2 actions">
                    <LinkButton path={VIEW_EVENT_FOR_CLUB.replace(":eventId", props.id).replace(":clubId", props.clubId)} text={"Details"} />
                </div>
            </div>
        </div>
    </>
}