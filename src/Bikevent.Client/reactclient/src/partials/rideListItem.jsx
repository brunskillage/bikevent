import moment from "moment"
import { EDIT_RIDE_FOR_CLUB, VIEW_RIDE_FOR_CLUB } from "../lib/common"
import { LinkButton } from "./wrappers/linkButton"
import bikeLogo from "../assets/Bike3.png"
import { createContext, useContext } from "react"

const RidesContext = createContext()

export const RideListItem = (props) => {
    return <>
        <RidesContext.Provider value={props}>
            <tr>
                <td><div className="timeBox">{moment(props.startsOn).fromNow(true)}</div>
                    <div className="date">
                        {moment(props.startsOn).format("h:mma, ddd Do MMM, YYYY")}
                    </div>
                </td>
                <td><RideListItem.Title></RideListItem.Title>
                    <RideListItem.ClubName></RideListItem.ClubName>
                </td>

                <td>
                    <div className="actions">
                        <LinkButton path={VIEW_RIDE_FOR_CLUB.replace(":rideId", props.id).replace(":clubId", props.clubId)} text={"Details"} />
                    </div>
                </td>
            </tr>
        </RidesContext.Provider>
    </>
}

RideListItem.Title = function RideListTitle() {
    const context = useContext(RidesContext)
    return <>
        <div className="title"><h3>{context.title} </h3></div>

    </>

}
RideListItem.ClubName = function RideListClub() {
    const context = useContext(RidesContext)
    return context?.nameOf && <div className="title">{context.nameOf}</div>
}