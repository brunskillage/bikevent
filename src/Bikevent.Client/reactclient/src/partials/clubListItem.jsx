import { NavLink } from "react-router-dom";
import { VIEW_CLUB } from "../lib/common";
import { LinkButton } from "./wrappers/linkButton";

export const ClubListItem = ({ club }) => {
    return (<>
        <div className="clubListItem">
            <NavLink to={VIEW_CLUB.replace(":clubId", club.id)}>
                <div className="nameOf">{club.nameOf}XX</div>
            </NavLink>
        </div>

    </>);
}