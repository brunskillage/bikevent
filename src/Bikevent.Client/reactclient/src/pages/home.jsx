import { useSelector } from "react-redux";
import { PageTitle } from "../partials/wrappers/pageTitle";
import { LinkButton } from "../partials/wrappers/linkButton";
import mainLogo from "../assets/bike2.png"
import { WHATS_HAPPENING } from "../lib/common";
import { Row, Stack } from "react-bootstrap";
import { CenteredContent } from "../partials/wrappers/centeredContent";

export const Home = () => {
    const auth = useSelector(state => state.user)
    return (<>
        <PageTitle title="Home Page" hideSubmenu={!auth.isLoggedIn} />

        <Row><CenteredContent>
            <Stack direction="horizontal" gap={1}>
                {!auth?.isLoggedIn &&
                    <>
                        <LinkButton path="/login" text="Sign In" /> or <LinkButton path="/account/create" text="Create" /> an account
                    </>
                }

                {auth.isLoggedIn && <>

                    <LinkButton path="/clubs" text="Clubs"></LinkButton>
                    <LinkButton path={WHATS_HAPPENING} text="Whats Happening"></LinkButton>

                </>
                }

            </Stack >   </CenteredContent>
        </Row>
        <Row>
            <CenteredContent>
                <img className="img400" src={mainLogo} alt="Bikevent main logo" />
            </CenteredContent>
        </Row>
    </>
    );
}
