import { NavLink } from "react-router-dom";

export const Home = () => {
    return ( <>          

    <div className="homePage">
            <h3>HomePage</h3>
            <p>
                Welcome to bikevent <NavLink to="/login">Sign In</NavLink> or <NavLink to="/account/create">Create Account</NavLink>
            </p>
    </div>
    </> );
}
