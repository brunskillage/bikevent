import moment from "moment"
import { EDIT_RIDE_FOR_CLUB, VIEW_RIDE_FOR_CLUB } from "../lib/common"
import { LinkButton } from "./wrappers/linkButton"
import bikeLogo from "../assets/Bike3.png"

export const RideListItem = (props) => {
    return <>
        <tr>
            <td><div className="timeBox">{moment(props.startsOn).fromNow(true)}</div></td>
            <td>                    <div className="title"><h3>{props.title}</h3></div>
                <div className="date">
                    {moment(props.startsOn).format("h:mma, ddd Do MMM, YYYY")}
                </div>
            </td>
            <td>
                <div className="actions">
                    <LinkButton path={VIEW_RIDE_FOR_CLUB.replace(":rideId", props.id).replace(":clubId", props.clubId)} text={"Details"} />
                </div>
            </td>
        </tr>
    </>
}