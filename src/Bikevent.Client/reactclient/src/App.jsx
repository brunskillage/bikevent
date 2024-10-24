import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { Home } from "./pages/home";
import { Error } from "./pages/error";
import { Header } from "./partials/header";
import { Footer } from "./partials/footer";
import { Login } from "./pages/login";
import { Rides } from "./pages/rides";
import { Events } from "./pages/events";
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
import { GlobalNavigate } from "./lib/globalHooks";

// unprotected routes

const Layout = () => {
    return (
        <>
            <div className='app'>
                <Header />
                <div className="container">
                    <div className="row">
                        <Outlet />
                    </div>
                </div>
                <Footer />
            </div>
        </>
    );
}

export const LayoutProtected = () => {

    // only show if logged in
    var auth = useSelector(state => state.user)

    return (
        <>
            <div className='app'>
                <Header />
                <div className="container">
                    <div className="row">
                        {auth?.isLoggedIn ? <Outlet /> : <Login />}
                    </div>
                </div>
                <Footer />
            </div>
        </>
    );
}


export const App = () => {


    const dispatch = useDispatch();
    // load intial app configuration
    dispatch(setAppConfig())

    var valid = isAuthValid()
    if (valid) {
        const auth = getLocalStorageItem('auth')
        dispatch(setUserState(auth))
    }

    const router = createBrowserRouter(
        [
            {
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
                        path: "/account",
                        element: <Account />,
                    },
                    {
                        // list
                        path: "/clubs",
                        element: <Clubs />,
                    },
                    {
                        // delete edit
                        path: "/club/:id/:pageMode?",
                        element: <Club />,
                    },
                    {
                        // list
                        path: "/rides",
                        element: <Rides />,
                    },
                    {
                        // delete edit
                        path: "/ride/:id/:pageMode?",
                        element: <Ride />,
                    },
                    {
                        path: "/events",
                        element: <Events />,
                    },
                    {
                        path: "/logout",
                        element: <Logout />,
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
