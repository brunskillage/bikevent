import { useContext } from "react"
import { UserContext } from "../App"
import { redirect } from "react-router-dom";


export const LoginGuard = () => {
    let userContext = useContext(UserContext)

    function checkContext()
     {
        if(!useContext.loggedIn){
            return redirect("/login");
        }
     }

    return (

        <>Checking Status</>
    );
}

