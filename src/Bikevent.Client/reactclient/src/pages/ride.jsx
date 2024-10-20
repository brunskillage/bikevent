import { NavLink } from "react-router-dom";
import { MsgA } from "../partials/wrappers/msg";

export const Ride = (args) => {
    return (<>
        <div className='rides'>
            <h3>Ride</h3>
            <NavLink to="/ride/add">+Add</NavLink>
            <MsgA>Select your ride</MsgA>
        </div>
    </>);
}
