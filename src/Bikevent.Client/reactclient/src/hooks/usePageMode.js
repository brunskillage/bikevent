import { useState, useEffect } from "react";
import { locationMatchesRoute } from "../lib/globalHooks";
import { ADD_RIDE_TO_CLUB, EDIT_RIDE_FOR_CLUB, PAGE_MODE_ADD, PAGE_MODE_EDIT, PAGE_MODE_VIEW } from "../lib/common";

export const useOnline = () => {
    const [pageMode, setPageMode] = useState(PAGE_MODE_VIEW)

    const getMode = () => {
        if (locationMatchesRoute(ADD_RIDE_TO_CLUB)) {
            setPageMode(PAGE_MODE_ADD)
        }
        else if (locationMatchesRoute(EDIT_RIDE_FOR_CLUB)) {
            setPageMode(PAGE_MODE_EDIT)
        }
    }

    useEffect(() => {
        getMode()
    }, [])
};
