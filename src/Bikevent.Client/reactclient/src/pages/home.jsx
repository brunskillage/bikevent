import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

export const Home = () => {

    const auth = useSelector(state => state.user)
    return (<>

        <div className="homePage">
            <h3>HomePage</h3>
            <p>
                Welcome to bikevent
            </p>
            {!auth?.isLoggedIn ? <><NavLink to="/login">Sign In</NavLink> or <NavLink to="/account/create">Create Account</NavLink></>
                : (<>
                    <div className="homeMenu">
                        <NavLink className='btn btn-a btn-sm' to="/clubs">CLUBS</NavLink>
                        <NavLink className='btn btn-a btn-sm' to="/rides">RIDES</NavLink>
                        <NavLink className='btn btn-a btn-sm' to="/events">EVENTS</NavLink>
                        <NavLink className='btn btn-a btn-sm' to="/account">ACCOUNT</NavLink>
                    </div>

                </>)}


        </div>
    </>);
}
