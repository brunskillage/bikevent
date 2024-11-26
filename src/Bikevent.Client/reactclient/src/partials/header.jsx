import { useSelector } from 'react-redux'
import { Container, Nav, Navbar } from "react-bootstrap";
import { NavLink } from 'react-router-dom';
import { FaMotorcycle } from "react-icons/fa6";

export const Header = () => {
    const user = useSelector(state => state.user)

    return (<>
        <Navbar expand="lg ps-4" className="bg-body-tertiary shadow ">
            <Container fluid >
                <FaMotorcycle style={{ height: '3rem', width: '3rem' }} /><Navbar.Brand className='ps-2' href="#home">Bikevent</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav mx-auto">
                    <Nav className="me-auto">
                        <NavLink className="nav-link" to={"/"}>Home</NavLink>
                        {user?.isLoggedIn ? <>
                            <NavLink className="nav-link" to={"/logout"}>logout {user.nickName}</NavLink>
                            <NavLink className="nav-link text-right" to="/account">Account</NavLink></>
                            :
                            <NavLink className="nav-link" to={"/login"}>login</NavLink>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </>);
}
