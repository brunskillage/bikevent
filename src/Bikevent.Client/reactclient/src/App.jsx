import { createBrowserRouter, RouterProvider, Outlet, Router, redirect } from "react-router-dom";
import { Home } from "./pages/home";
import { Error } from "./pages/error";
import { Header } from "./partials/header";
import { Footer } from "./partials/footer";
import { Login } from "./pages/login";
import { createContext, useContext, useEffect } from "react";
import { CreateAccount } from "./pages/createAccount";
import { Rides } from "./pages/rides";
import { Events } from "./pages/events";
import { Account } from "./pages/account";
import moment from 'moment'

// get the configuration for all the things
let GetConfig = async () => {
    try {
        var res = await fetch("https://localhost:7186/api/v1/config");
        return res.json();
    } catch (error) {
        redirect("/error")
    }
}


export let appConfigContext = createContext({ isDevEnvironment: false, apiDomain: "https://localhost:3000", tokenExpiryMinutes: 30 })
appConfigContext = createContext(await GetConfig())

// Protected routes
function LayoutProtected() {
    
    let userCtxJson = localStorage.getItem('be_user');
    let expireDate = moment(localStorage.getItem('be_token_expires'));
    let userCtx;
    if(userCtxJson){
        userCtx = JSON.parse(userCtxJson)
    }

    return (
        <>
         <div className='app'>
            <Header />
            <div className="container">
                <div className="row">
                {userCtx?.loggedIn && <Outlet />}
                {!userCtx?.loggedIn && <Login />}
                </div>
            </div>
            <Footer />
            </div> 
        </>
    );
}

// unprotected routes
function Layout() {
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

export const App = () => {
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
                        }
                    ]
                },
                {
                    element: <LayoutProtected />,
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
                        }
                    ]
                }

            ])}
        />
    </>);
}
