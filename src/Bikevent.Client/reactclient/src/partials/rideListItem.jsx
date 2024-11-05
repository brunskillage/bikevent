import moment from "moment"
import { EDIT_RIDE_FOR_CLUB, VIEW_RIDE_FOR_CLUB } from "../lib/common"
import { LinkButton } from "./wrappers/linkButton"
import bikeLogo from "../assets/Bike3.png"

export const RideListItem = (props) => {
    return <>
        <div className="row">
            <div className="rideListItem">
                <div className="left">
                    <div className="timeBox">{moment(props.startsOn).fromNow(true)}</div>
                </div>
                <div className="right">
                    <div className="title"><h3>{props.title}</h3></div>
                    {moment(props.startsOn).format("h:mma, ddd Do MMM")}
                    <div><LinkButton path={VIEW_RIDE_FOR_CLUB.replace(":rideId", props.id).replace(":clubId", props.clubId)} text={"Details"} /></div>

                </div>

            </div>
        </div>
    </>
}