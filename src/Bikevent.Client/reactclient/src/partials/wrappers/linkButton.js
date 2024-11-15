import { Button } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";

export const LinkButton = ({ path, text, onClick = null }) => {

    // if (typeof handleOnClick === 'function') {
    //     return <NavLink className="btn btn-a btn-sm linkButton" path={path} onClick={onClick}>{text}</NavLink>
    // }

    return (<>
        <NavLink className="btn btn-primary m-1" to={path} onClick={onClick}>{text}</NavLink>
    </>);
}
