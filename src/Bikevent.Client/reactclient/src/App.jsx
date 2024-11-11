import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { Home } from "./pages/home";
import { Error } from "./pages/error";
import { Header } from "./partials/header";
import { Footer } from "./partials/footer";
import { Login } from "./pages/login";
import { Rides } from "./pages/rides";
import { Account } from "./pages/account";
import { Logout } from "./pages/logout";
import { Tester } from "./pages/tester";
import { Clubs } from "./pages/clubs";
import { useDispatch, useSelector } from "react-redux";
import { setAppConfig } from "./store/thunks";
import { isAuthValid } from "./lib/auth";
import { getLocalStorageItem } from "./lib/localStorageClient";
import { setUserState } from "./store/userSlice";
import { CreateAccount } from "./pages/createAccount";
import { NotFound } from "./pages/notFound";
import { TimerA } from "./partials/wrappers/timer";
import { Club } from "./pages/club";
import { Ride } from "./pages/ride";
import { globaldispatch, GlobalNavigate } from "./lib/globalHooks";
import { ADD_CLUB, ADD_RIDE_TO_CLUB, EDIT_CLUB, EDIT_EVENT_FOR_CLUB, EDIT_RIDE_FOR_CLUB, USER_ACCOUNT, USER_LOGOUT, VIEW_CLUB, VIEW_CLUBS, VIEW_EVENT_FOR_CLUB, VIEW_EVENTS_FOR_CLUB, VIEW_RIDE_FOR_CLUB, VIEW_RIDES_FOR_CLUB, WHATS_HAPPENING } from "./lib/common";
import { Events } from "./pages/events";
import { Event } from "./pages/event";
import { WhatsHappening } from "./pages/whatsHappening";

// unprotected routes

const Layout = () => {
    return (
        <>
            <div className='app'>
                <Header />
                <Outlet />
                <Footer />
            </div>
        </>
    );
}

export const LayoutProtected = () => {

    // only show if logged in
    var user = useSelector(state => state.user)

    return (
        <>
            <Header />
            {user?.isLoggedIn ? <Outlet /> : <Home />}
            <Footer />
        </>
    );
}


export const App = () => {

    const dispatch = useDispatch()
    // load intial app configuration
    dispatch(setAppConfig())

    if (isAuthValid()) {
        const auth = getLocalStorageItem('auth')
        dispatch(setUserState(auth))
    }


    const router = createBrowserRouter(
        [
            {
                // GlobalNavigate hoists hooks to global level in a null view 
                // unusual but works
                element: <> <GlobalNavigate /><Layout /></>,
                errorElement: <Error />,
                children: [
                    {
                        path: "/",
                        element: <Home />,
                    },
                    {
                        path: "/login",
                        element: <Login />,
                    },
                    {
                        path: "/error",
                        element: <Error />,
                    },
                    {
                        path: "/tester",
                        element: <Tester />,
                    }, {
                        path: "/account/create",
                        element: <CreateAccount />,
                    },
                    {
                        path: "*",
                        element: <NotFound />,
                    }
                ]
            },
            {
                element:
                    <><TimerA /><GlobalNavigate /><LayoutProtected /></>
                ,
                errorElement: <Error />,

                children: [
                    {
                        path: USER_ACCOUNT,
                        element: <Account />,
                    },
                    {
                        path: VIEW_RIDE_FOR_CLUB,
                        element: <Ride />,
                    },
                    {
                        path: ADD_RIDE_TO_CLUB,
                        element: <Ride />,
                    },
                    {
                        path: EDIT_RIDE_FOR_CLUB,
                        element: <Ride />,
                    },
                    {
                        path: VIEW_RIDES_FOR_CLUB,
                        element: <Rides />,
                    },
                    {
                        path: VIEW_EVENT_FOR_CLUB,
                        element: <Event />,
                    },
                    {
                        path: EDIT_EVENT_FOR_CLUB,
                        element: <Event />,
                    },
                    {
                        path: VIEW_EVENTS_FOR_CLUB,
                        element: <Events />,
                    },
                    {
                        path: ADD_CLUB,
                        element: <Club />,
                    },
                    {
                        path: EDIT_CLUB,
                        element: <Club />,
                    },
                    {
                        path: VIEW_CLUB,
                        element: <Club />,
                    },
                    {
                        path: VIEW_CLUBS,
                        element: <Clubs />,
                    },
                    {
                        path: USER_LOGOUT,
                        element: <Logout />,
                    },
                    {
                        path: WHATS_HAPPENING,
                        element: <WhatsHappening />,
                    },
                    {
                        path: "*",
                        element: <NotFound />,
                    }
                ]
            }

        ])



    return (<>
        <RouterProvider router={router} />
    </>);
}
