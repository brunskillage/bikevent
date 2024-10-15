import { jwtDecode } from "jwt-decode";
import { getLocalStorageItem, removeLocalStorageItemsByPrefix } from "./localStorageClient"
import moment from "moment";


export const isAuthValid = () => {
    const storedAuth = getLocalStorageItem('auth')
    if(!storedAuth) return false;

    const token = storedAuth.token;
    const decodedToken = jwtDecode(token)
    const expiresOn = moment(decodedToken.exp * 1000)

    // check token expires is valid
    const valid = expiresOn > moment()
    if(!valid){
       removeLocalStorageItemsByPrefix()
    }

    return valid;
} 