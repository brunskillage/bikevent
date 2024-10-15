import { NavLink } from "react-router-dom";
import { useLocalStorage } from '../hooks/useLocalStorage';
import { setUserState } from './../store/userSlice'
import { useDispatch, useSelector } from 'react-redux'

export const Logout = () => {
    const user = useSelector(state => state.user)
    const dispatch = useDispatch();

    const { removeLocalStorageItemsByPrefix2 } = useLocalStorage()
    removeLocalStorageItemsByPrefix2()

    const onLogout = () => {
        dispatch(setUserState({
            email: '',
            isLoggedIn: false,
            userName: ''
        }))
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
                    <p>
                        Thanks for using bikevent! <NavLink to="/login">Sign In</NavLink> to use again.
                    </p>
                </>}
        </div>
    </>

    );
}
