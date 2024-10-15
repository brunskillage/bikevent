
import moment from "moment"

export class DBItem {
    constructor(key, val,expires){
        this.key = key
        this.val = val
        this.expires = expires
    }
}

export const useLocalStorage = () =>  {

    const prefix = "be_"

    let setLocalStorageItem = (key, val, expiresMinutes) => {
        var expires = moment().add(expiresMinutes, 'minutes');
        let dbEntry = new DBItem(key, val, expires) 
        localStorage.setItem(`${prefix}${key}`, JSON.stringify(dbEntry))
    }

    let getLocalStorageItem = (key) => {
        let jsonRes = localStorage.getItem(`${prefix}${key}`)
        if(!jsonRes) return null;

        if(!jsonRes.startsWith('{') && !jsonRes.endsWith('}')){
            return jsonRes;
        }

        let item = JSON.parse(jsonRes)
        let expiresOn = moment(item.expires)
        if(moment() > expiresOn){
            localStorage.removeItem(`${prefix}${key}`)
            return null;
        } 

        return JSON.parse(item.val);
    }

    let deleteLocalStorageItem = (key) => {
        localStorage.removeItem(`${prefix}${key}`)
    }

    let removeLocalStorageItemsByPrefix2 = () => {
        for (let k in localStorage){
            if(k.startsWith(prefix)){
                localStorage.removeItem(k)
            }
        }
    }

    return {getLocalStorageItem,setLocalStorageItem,
        deleteLocalStorageItem, removeLocalStorageItemsByPrefix2}
}