import { NavLink, useNavigate } from "react-router-dom";
import { setUserState } from './../store/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import { removeLocalStorageItemsByPrefix } from "../lib/localStorageClient";
import { globaldispatch } from "../lib/globalHooks";

export const Logout = () => {
    const user = useSelector(state => state.user)

    const onLogout = () => {
        removeLocalStorageItemsByPrefix()
        globaldispatch(setUserState({}))
    }

    return (<>
        <div className="homePage">

            {user?.isLoggedIn ?
                <>
                    <h3>Sign out</h3>
                    <p>Click 'Sign out' button below to sign out.</p>
                    <p><button className="btn btn-a btn-sm" onClick={() => onLogout()}>Sign Out</button></p>
                </>
                :
                <>
                    <h3>You are now signed out</h3>
                    <p className="msg">
                        Thanks for using bikevent! <NavLink to="/login">Sign In</NavLink> to use again.
                    </p>
                </>}
        </div>
    </>

    );
}
