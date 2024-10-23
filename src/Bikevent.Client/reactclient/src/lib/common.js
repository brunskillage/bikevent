/* eslint-disable no-extend-native */
import moment from "moment"

export const PAGE_MODE_ADD = 'add'
export const PAGE_MODE_EDIT = 'edit'
export const PAGE_MODE_VIEW = 'view'

// becuase the natural behavior of the time handling in maria db and framework,
// dates come back without Z UTC signifier despite being saved in UTC on MariaDB
// this function returns a local moment object for the ui
export const momentToLocal = (date) => {
    if(date){
        return moment(date + "Z").local()
    }
    return ""
}