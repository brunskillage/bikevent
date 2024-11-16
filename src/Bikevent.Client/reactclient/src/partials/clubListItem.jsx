import { NavLink } from "react-router-dom";
import { VIEW_CLUB } from "../lib/common";
import { LinkButton } from "./wrappers/linkButton";
import { Card } from "react-bootstrap";

export const ClubListItem = ({ club }) => {
    return (<>

        <Card className="shadow" style={{ width: '18rem', margin: '0.2rem' }} >
            <Card.Body>
                <Card.Title>{club.nameOf}</Card.Title>
                <Card.Text>
                    <NavLink to={VIEW_CLUB.replace(":clubId", club.id)}>View</NavLink>
                </Card.Text>
            </Card.Body>

        </Card>
    </>);
}