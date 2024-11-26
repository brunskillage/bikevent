import moment from "moment"
import { VIEW_EVENT_FOR_CLUB } from "../lib/common"
import { LinkButton } from "./wrappers/linkButton"

export const EventListItem = (props) => {
    return <>
        <tr>
            <td><div className="timeBox">{moment(props.startsOn).fromNow(true)}</div></td>
            <td>                    <div className="title"><h3>{props.title}</h3></div>
                <div className="date">
                    {moment(props.startsOn).local().format("h:mma, dddd Do MMMM, YYYY")}
                </div>
            </td>
            <td>
                <div className="actions">
                    <LinkButton path={VIEW_EVENT_FOR_CLUB.replace(":eventId", props.id).replace(":clubId", props.clubId)} text={"Details"} />
                </div>
            </td>
        </tr>
    </>
}
