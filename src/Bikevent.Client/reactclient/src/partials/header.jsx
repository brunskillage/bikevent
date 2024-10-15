import { NavLink } from "react-router-dom";
import { useSelector } from 'react-redux'

const onNavClick = (e) => {
    e.target.focus()
}

export const Header = () => {
    const count = useSelector(state => state.counter.value)
    const user = useSelector(state => state.user)

    return (<>
        <nav className="nav" tabIndex="-1" onClick={onNavClick}>
            <div className="container">

                <NavLink className='link pagename current' to="#">Bikevent</NavLink>
                <NavLink className='link' to="/">HOME</NavLink>
                <NavLink className='link' to="/rides">RIDES</NavLink>
                <NavLink className='link' to="/events">EVENTS</NavLink>
                <NavLink className='link' to="/account">ACCOUNT</NavLink>
                {user?.isLoggedIn ?
                    <NavLink className='link' to="/logout">LOGOUT {user.email}</NavLink>
                    :
                    <NavLink className='link' to="/login">LOGIN</NavLink>
                }

            </div>
        </nav>
    </>);
}
