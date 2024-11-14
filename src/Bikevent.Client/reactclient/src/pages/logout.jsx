import { NavLink, useNavigate } from "react-router-dom";
import { setUserState } from './../store/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import { removeLocalStorageItemsByPrefix } from "../lib/localStorageClient";
import { globaldispatch, globalNavigate } from "../lib/globalHooks";
import { PageTitle } from "../partials/wrappers/pageTitle";
import { LinkButton } from "../partials/wrappers/linkButton";

export const Logout = () => {
    const user = useSelector(state => state.user)

    const onLogout = (e) => {
        // e.preventDefault()
        // alert('x')
        removeLocalStorageItemsByPrefix()
        globaldispatch(setUserState({}))
        // globalNavigate("/")
    }

    return (<>

        <PageTitle title="Sign Out" />
        {user?.isLoggedIn && <LinkButton path="/logout" text="Log Out" onClick={e => onLogout(e)} />}
        {!user?.isLoggedIn && <LinkButton path="/login" text="Sign In" />}
        {/* 

                {user?.isLoggedIn ?
                    <>
                        <p>Click 'Sign out' button below to sign out.</p>
                        <p><button className="btn btn-a btn-sm" onClick={() => onLogout()}>Sign Out</button></p>
                    </>
                    :
                    <>
                        <h3>You are now signed out</h3>
                        <p className="msg">
                            Thanks for using bikevent! <NavLink to="/login">Sign In</NavLink> to use again.
                        </p>
                    </>}             */}
    </>

    );
}
