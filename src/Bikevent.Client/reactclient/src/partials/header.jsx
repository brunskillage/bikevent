import { useSelector } from 'react-redux'
import { Container, Nav, Navbar } from "react-bootstrap";


export const Header = () => {
    const user = useSelector(state => state.user)

    return (<>
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="#home">Bikevent</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        {user?.isLoggedIn ?
                            <Nav.Link href="/logout">LOGOUT {user.nickName}</Nav.Link>
                            :
                            <Nav.Link href="/login">LOGIN</Nav.Link>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </>);
}
