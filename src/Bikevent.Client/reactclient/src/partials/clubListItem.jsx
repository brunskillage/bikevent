import { NavLink } from "react-router-dom";
import { VIEW_CLUB } from "../lib/common";
import { LinkButton } from "./wrappers/linkButton";

export const ClubListItem = ({ club }) => {
    return (<>
        <div className="clubListItem">
            <div className="nameOf">{club.nameOf}XX</div>
            <LinkButton path={VIEW_CLUB.replace(":clubId", club.id)} text="open" />
        </div>

    </>);
}