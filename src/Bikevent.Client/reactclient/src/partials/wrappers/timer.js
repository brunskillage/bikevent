import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getLocalStorageItem, removeLocalStorageItemsByPrefix } from "../../lib/localStorageClient";
import moment from "moment";
import { setUserState } from "../../store/userSlice";

export const TimerA = () => {

    var navigate = useNavigate()
    const dispatch = useDispatch()

    const checkUser = () =>{
        console.log('checking local storage for auth...')
 
        // this will clear items if not valid
        let auth = getLocalStorageItem('auth')
 
        if(!auth){
            removeLocalStorageItemsByPrefix()
            dispatch(setUserState({}))
            navigate('/login')
            delete window._timerId
        }
    }

    if(window._timerId === undefined){
        window._timerId = setInterval(() => checkUser(), 15000)
    }

    return ( <></>);
}