import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getLocalStorageItem, removeLocalStorageItemsByPrefix } from "../../lib/localStorageClient";
import { setUserState } from "../../store/userSlice";
import { globaldispatch, globalNavigate } from "../../lib/globalHooks";

export const TimerA = () => {

    const checkUser = () => {
        console.log('checking local storage for auth...')

        // this will clear items if not valid
        let auth = getLocalStorageItem('auth')

        if (!auth) {
            removeLocalStorageItemsByPrefix()
            globaldispatch(setUserState({}))
            globalNavigate('/login')
            delete window._timerId
        }
    }

    if (window._timerId === undefined) {
        window._timerId = setInterval(() => checkUser(), 15 * 60 * 1000)
    }

    return (<></>);
}