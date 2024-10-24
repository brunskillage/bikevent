import { NavLink } from "react-router-dom";
import { useSelector } from 'react-redux'
import { useRef } from "react";
import { useOnline } from "../hooks/useOnline";
import { MsgErrorA } from "./wrappers/msg"


export const Header = () => {
    const isOnline = useOnline(true)
    const count = useSelector(state => state.counter.value)
    const user = useSelector(state => state.user)
    const navDiv = useRef(null)
    const onNavClick = (e) => {
        e.currentTarget.focus()
    }

    return (<>
        <nav className="nav" tabIndex="-1" onClick={onNavClick}>
            <div className="container">
                <NavLink className='pagename current' to="/">Bikevent</NavLink>
                <NavLink className='link' to="/">HOME</NavLink>
                {user?.isLoggedIn ?
                    <NavLink className='link' to="/logout">LOGOUT {user.nickName}</NavLink>
                    :
                    <NavLink className='link' to="/login">LOGIN</NavLink>
                }

            </div>
        </nav>
        {!!isOnline && <><nav className="nav" tabIndex="-1" onClick={onNavClick}>
            <div className="container">
                <MsgErrorA>You are offLine</MsgErrorA>
            </div>
        </nav></>}

    </>);
}
