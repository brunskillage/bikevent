import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { PageTitle } from "../partials/wrappers/pageTitle";
import { LinkButton } from "../partials/wrappers/linkButton";
import mainLogo from "../assets/bike2.png"
import { PageContainer } from "../partials/wrappers/pageContainer";
import { WHATS_HAPPENING } from "../lib/common";

export const Home = () => {
    const auth = useSelector(state => state.user)
    return (<>
        <PageTitle title="Home Page" hideSubmenu={!auth.isLoggedIn}>
            {auth.isLoggedIn && <>
                <NavLink className='btn btn-a btn-sm' to="/clubs">CLUBS</NavLink>
                <NavLink className='btn btn-a btn-sm' to="/account">ACCOUNT</NavLink>
                <LinkButton path={WHATS_HAPPENING} text="Whats Happening"></LinkButton>
            </>
            }

        </PageTitle>
        <div className="homePage">

            <PageContainer>
                <h2>Welcome to Bikevent</h2>



                {!auth?.isLoggedIn ?
                    <>
                        <LinkButton path="/login" text="Sign In" /> or <LinkButton path="/account/create" text="Create" /> an account
                    </>
                    :
                    <>

                    </>}
                <div>
                    <img className="img400" src={mainLogo} alt="Bikevent main logo" />
                </div>
            </PageContainer>




        </div>
    </>

    );
}
