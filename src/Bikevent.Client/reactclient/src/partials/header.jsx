import { useSelector } from 'react-redux'
import { Container, Nav, Navbar } from "react-bootstrap";
import { NavLink } from 'react-router-dom';


export const Header = () => {
    const user = useSelector(state => state.user)

    return (<>
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container fluid>
                <Navbar.Brand href="#home">Bikevent</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavLink className="nav-link" to={"/"}>Home</NavLink>
                        {user?.isLoggedIn ?
                            <NavLink className="nav-link" to={"/logout"}>logout {user.nickName}</NavLink>
                            :
                            <NavLink className="nav-link" to={"/login"}>login</NavLink>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </>);
}
