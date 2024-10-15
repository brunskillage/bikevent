import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

export const Home = () => {

    const auth = useSelector(state => state.user)
    return (<>

        <div className="homePage">
            <h3>HomePage</h3>
            <p>
                Welcome to bikevent
            </p><p>
                {!auth?.isLoggedIn ? <><NavLink to="/login">Sign In</NavLink> or <NavLink to="/account/create">Create Account</NavLink></>
                    : (<>View some <NavLink to='/rides'>rides</NavLink> or <NavLink to='/events'>events</NavLink></>)}
            </p>

        </div>
    </>);
}
