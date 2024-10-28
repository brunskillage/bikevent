import { Link, NavLink } from "react-router-dom";

export const LinkButton = ({ path, text, handleOnClick }) => {

    if (typeof handleOnClick === 'function') {

    }

    return (<>
        <NavLink className="btn btn-a btn-sm linkButton" to={path} onClick={handleOnClick}>{text}</NavLink>
    </>);
}