import { useSelector } from 'react-redux'
import { Container, Nav, Navbar } from "react-bootstrap";
import { NavLink } from 'react-router-dom';
import { FaMotorcycle, FaRegCircleUser, FaArrowRightFromBracket } from "react-icons/fa6";


export const Header = () => {
    const user = useSelector(state => state.user)

    return (<>
        <Navbar expand="lg ps-4" className="bg-body-tertiary shadow ">
            <Container fluid >
                <NavLink className="nav-link" to={"/"}><FaMotorcycle style={{ height: '1.5rem', width: '2rem', marginBottom: 3 }} /></NavLink>
                <Navbar.Brand className='ps-2' href="/">Bikevent</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav mx-auto" className='justify-content-end'>
                    <Nav>
                        {user?.isLoggedIn ? <>
                            <NavLink className="nav-link" to={"/logout"}> <FaArrowRightFromBracket></FaArrowRightFromBracket> Sign Out</NavLink>
                            <NavLink className="nav-link text-right" to="/account"><FaRegCircleUser className='text-end' ></FaRegCircleUser > {user.nickName}</NavLink></>
                            :
                            <NavLink className="nav-link" to={"/login"}>login</NavLink>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </>);
}
