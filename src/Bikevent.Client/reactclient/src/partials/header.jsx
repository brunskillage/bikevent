import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { UserContext } from "../App";

const onNavClick = (e) => {
    e.target.focus()
}

export const Header = () => {
    return ( <>
        <nav className="nav" tabIndex="-1" onClick={onNavClick}>
            <div className="container">
                    <NavLink className='link pagename current' to="#">Bikevent</NavLink>
                    <NavLink className='link' to="/">HOME</NavLink>
                    <NavLink className='link' to="/rides">RIDES</NavLink> 
                    <NavLink className='link' to="/events">EVENTS</NavLink> 
                    <NavLink className='link' to="/account">ACCOUNT</NavLink> 
                    <NavLink className='link' to="/login">LOGIN</NavLink>  
            </div>
        </nav>
    </> );
}
