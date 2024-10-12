import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { Home } from "./pages/home";
import { Error } from "./pages/error";
import { Header } from "./partials/header";
import { Footer } from "./partials/footer";
import { Login } from "./pages/login";
import { createContext, useContext } from "react";

export const UserContext = createContext({loggedIn: true, userName: "bob", token: 'sadgfsd97fgsidfghsd'})


// Protected routes
function LayoutProtected() {

    let userContext = useContext(UserContext)

    return (
        <>
            <Header />
            <div className='app'>
                <div className="content">
                  {userContext.loggedIn && <Outlet />}
                  {!userContext.loggedIn && <Login />}
                </div>
            </div>
            <Footer />
        </>
    );
}

// unprotected routes
function Layout() {
    return (
        <>
            <Header />
            <div className='app'>
                <div className="content">
                  <Outlet />
                </div>
            </div>
            <Footer />
        </>
    );
}

export const App = ({ children }) => {
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
                        }
                    ]
                },
                {
                    element: <LayoutProtected />,
                    errorElement: <Error />,
                    children: [
                        {
                            path: "/account",
                            element: <Login />,
                        },
                        {
                            path: "/rides",
                            element: <Login />,
                        },
                        {
                            path: "/events",
                            element: <Login />,
                        }
                    ]
                }

            ])}
        />
    </>);
}
