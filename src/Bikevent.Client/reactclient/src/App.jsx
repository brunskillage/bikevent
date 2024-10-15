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
import { useDispatch, useSelector } from "react-redux";
import { setAppConfig } from "./store/thunks";
import { isAuthValid } from "./lib/auth";
import { getLocalStorageItem } from "./lib/localStorageClient";
import { setUserState } from "./store/userSlice";
import { CreateAccount } from "./pages/createAccount";

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

    return (<>
        <RouterProvider router={createBrowserRouter(
            [
                {
                    element: <Layout />,
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
                        }
                    ]
                },
                {
                    element:
                        <LayoutProtected />
                    ,
                    errorElement: <Error />,
                    children: [
                        {
                            path: "/account",
                            element: <Account />,
                        },
                        {
                            path: "/account/create",
                            element: <CreateAccount />,
                        },
                        {
                            path: "/rides",
                            element: <Rides />,
                        },
                        {
                            path: "/events",
                            element: <Events />,
                        },
                        {
                            path: "/logout",
                            element: <Logout />,
                        }
                    ]
                }

            ])}
        />
    </>);
}
