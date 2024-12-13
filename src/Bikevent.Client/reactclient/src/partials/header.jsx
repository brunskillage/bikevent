import { useDispatch } from 'react-redux'
import { Container, Navbar } from "react-bootstrap";
import { NavLink } from 'react-router-dom';
import { FaMotorcycle, FaBurger } from "react-icons/fa6";
import { toggleSideBar } from '../store/utilSlice';


export const Header = () => {

    const dispatch = useDispatch()

    const handleMenuClick = (e) => {
        dispatch(toggleSideBar())
    }

    return (<>
        <Navbar expand="lg ps-4" className="bg-body-tertiary shadow ">
            <Container fluid >
                <FaBurger onClick={handleMenuClick} style={{ height: '1.5rem', width: '2rem', marginBottom: 3 }} />

                <NavLink className="nav-link" to={"/"}><FaMotorcycle style={{ height: '1.5rem', width: '2rem', marginBottom: 3 }} /></NavLink>
                <Navbar.Brand className='ps-2' href="/">Bikevent</Navbar.Brand>
                {/* <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={handleMenuClick} />
                <Navbar.Collapse id="basic-navbar-nav mx-auto" className='justify-content-end'>
                    <Nav>
                        {user?.isLoggedIn ? <>
                            <NavLink className="nav-link" to={"/logout"}> <FaArrowRightFromBracket></FaArrowRightFromBracket> Sign Out</NavLink>
                            <NavLink className="nav-link text-right" to="/account"><FaRegCircleUser className='text-end' ></FaRegCircleUser > {user.nickName}</NavLink></>
                            :
                            <NavLink className="nav-link" to={"/login"}>login</NavLink>
                        }
                    </Nav>
                </Navbar.Collapse> */}
            </Container>
        </Navbar>
    </>);
}
