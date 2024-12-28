import { Col, Container, Row } from "react-bootstrap";
import { Route } from "react-router-dom";
import { ClubLogo } from "./clubLogo";

export const ClubHeader = ({ club }) => {
    return <>
        <Container>
            <Row>
                <Col><ClubLogo club={club}></ClubLogo></Col>
            </Row>
            <Row className='pt-3'>
                <Col>{club?.nameOf}</Col>
            </Row>
        </Container>
    </>
};