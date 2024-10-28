/* eslint-disable no-extend-native */
import moment from "moment"

export const PAGE_MODE_ADD = 'add'
export const PAGE_MODE_EDIT = 'edit'
export const PAGE_MODE_VIEW = 'view'



// user can
export const DELETE_USER = "/user/:id/delete"
export const EDIT_USER = "/user/:id/edit"
export const VERIFY_USER = "user/:id/verify"
export const VIEW_USER = "/user/:id"
export const ADD_USER = "/user/add"
export const REMOVE_USER_FROM_CLUB = "/user/:id/delete"
export const SUBSCRIBE_TO_RIDES_FOR_REGION = "/user/:id/subscribe/:regionId"

// admin can
export const ADD_RIDE_TO_CLUB = "/club/:clubId/addride"
export const DELETE_RIDE_FROM_CLUB = "/club/:clubId/ride/:rideId/delete"
export const VIEW_RIDES_FOR_CLUB = "/club/:clubId/rides"
export const VIEW_RIDE_FOR_CLUB = "/club/:clubId/ride/:rideId"

export const ADD_RIDE = "/ride/add"
export const EDIT_RIDE_FOR_CLUB = "/club/:clubId/ride/:rideId/edit"

// TODO
export const VIEW_CLUBS = "/clubs"
export const ADD_CLUB = "/club/add"
export const VIEW_CLUB = "/club/:clubId"
export const EDIT_CLUB = "/club/:clubId/edit"
export const DELETE_CLUB = "/club/:clubId/delete"
//export const VIEW_RIDES_FOR_REGION = "rides/region/:id"
//export const VIEW_RIDES_FOR_COUNTRY = "/rides/country/:id"
//export const VIEW_RIDES_WITHIN_RANGE = "/rides/nearme"
//export const ADD_CLUB_TO_REGION = "/club/:id/addtoregion"
//export const BLOCK_USER = "/user/:id/block"
// export const ADD_USER_TO_CLUB = "user/:id/addtoclub"
//export const ADD_CLUB = "/club/add"


// becuase the natural behavior of the time handling in maria db and framework,
// dates come back without Z UTC signifier despite being saved in UTC on MariaDB
// this function returns a local moment object for the ui

export const momentToLocal = (date) => {
    if (date) {
        return moment(date + "Z").local()
    }
    return ""
}

export const momentDisplayFormat = "dddd, DD MMM yyyy hh:mm A"

export const momentToLocalString = (date) => {
    if (date) {
        return moment(date + "Z").local().format(momentDisplayFormat)
    }
    return ""
}

export const areObjectsTheSame = (obj1, obj2) => {

    let obj1Props = Object.getOwnPropertyNames(obj1).sort();
    let obj2Props = Object.getOwnPropertyNames(obj2).sort()

    // check they are the same length
    if (obj1Props.length !== obj2Props.length) {
        console.log("The objects have different properties count")
        return false;
    }

    // check the properties
    let theSameProps = obj1Props.every((val, idx) => {
        return obj1Props[idx] === obj2Props[idx]
    })

    // they are the same check the values
    if (theSameProps) {
        var propName = ""
        for (let i = 0; i < obj1Props.length; i++) {
            propName = obj1Props[i]
            if (obj2[propName] !== obj1[propName]) {
                console.log("item changed " + obj1[propName])
                return false;
            }
        }
    }
    else {
        console.log("The objects have different properties")
        return false
    }

    return true;
}
