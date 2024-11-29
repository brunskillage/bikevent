import { NavLink } from "react-router-dom";
import { VIEW_CLUB } from "../lib/common";
import { LinkButton } from "./wrappers/linkButton";
import { Card } from "react-bootstrap";






export const ClubListItem = ({ club }) => {
    return (<>

        <Card className="shadow clubListItem"   >
            <Card.Body>
                <Card.Title className="text-center">{club.nameOf}</Card.Title>
                <NavLink to={VIEW_CLUB.replace(":clubId", club.id)}>
                    <Card.Img className="rounded-1" src={"/club_logo/" + club.logoImagePath}></Card.Img>
                </NavLink>
                <Card.Text>

                </Card.Text>
            </Card.Body>

        </Card >
    </>);
}

