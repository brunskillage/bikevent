import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { UserContext } from "../App";

export const Header = () => {

  let userContext = useContext(UserContext);    

    return ( <>

        <div className='header'>LOGO
            <NavLink className='link' to="/">HOME</NavLink>
            <NavLink className='link' to="/rides">RIDES</NavLink> 
            <NavLink className='link' to="/events">EVENTS</NavLink> 
            <NavLink className='link' to="/account">ACCOUNT</NavLink> 
            <NavLink className='link' to="/login">LOGIN</NavLink>  
            User: {userContext.userName}
            Logged in {userContext.loggedIn.toString()}
        </div>
    </> );
}
