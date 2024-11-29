import { setUserState } from './../store/userSlice'
import { useSelector } from 'react-redux'
import { removeLocalStorageItemsByPrefix } from "../lib/localStorageClient";
import { globaldispatch } from "../lib/globalHooks";
import { PageTitle } from "../partials/wrappers/pageTitle";
import { LinkButton } from "../partials/wrappers/linkButton";
import { PageContainer } from '../partials/wrappers/pageContainer';
import { SubMenu } from '../partials/wrappers/subMenu';

export const Logout = () => {
    const user = useSelector(state => state.user)

    const onLogout = (e) => {
        removeLocalStorageItemsByPrefix()
        globaldispatch(setUserState({}))
        // globalNavigate("/")
    }

    return (<>
        <PageContainer>
            <PageTitle>
                Sign Out
            </PageTitle>
            <SubMenu>
                <p>
                    Click button below to Sign Out of Bikevent
                </p>
                {user?.isLoggedIn && <LinkButton path="/logout" text="Sign Out" onClick={e => onLogout(e)} />}
                {!user?.isLoggedIn && <LinkButton path="/login" text="Sign In" />}
            </SubMenu>
        </PageContainer>
    </>
    );
}
