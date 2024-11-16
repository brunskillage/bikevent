import moment from "moment";
import { LocalStorageItem } from "./dataObjects";

const prefix = "be_"

export let setLocalStorageItem = (key, val, expiresMinutes) => {
    var expires = moment().add(expiresMinutes, 'minutes');
    let dbEntry = new LocalStorageItem(key, val, expires)
    localStorage.setItem(`${prefix}${key}`, JSON.stringify(dbEntry))
}

export let getLocalStorageItem = (key) => {
    let jsonRes = localStorage.getItem(`${prefix}${key}`)
    if (!jsonRes) return null;

    if (!jsonRes.startsWith('{') && !jsonRes.endsWith('}')) {
        return jsonRes;
    }

    let item = JSON.parse(jsonRes)
    let expiresOn = moment(item.expires)
    let now = moment()
    if (moment > expiresOn) {
        localStorage.removeItem(`${prefix}${key}`)
        return null;
    }

    return JSON.parse(item.val);
}

export let deleteLocalStorageItem = (key) => {
    localStorage.removeItem(`${prefix}${key}`)
}

export let removeLocalStorageItemsByPrefix = () => {

    Object.keys(localStorage).forEach(k => {
        if (k.startsWith(prefix)) {
            localStorage.removeItem(k)
        }
    });
}

export const toTitleCase = (str) => {
    return str.replace(
        /\w\S*/g,
        function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }
    );
}



