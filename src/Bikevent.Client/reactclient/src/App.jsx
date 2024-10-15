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
    return (
        <>
            <div className='app'>
                <Header />
                <div className="container">
                    <div className="row">
                        {/* {appConfigData.isDevEnvironment && <Outlet />}
                {!appConfigData?.loggedIn && <Login />} */}
                        <Outlet />
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
