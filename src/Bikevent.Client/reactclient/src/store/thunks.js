import axios from "axios"
import { setTodos } from "./counterSlice"
import { setConfigState } from "./appConfigSlice"
import axiosConfig from "../lib/axiosConfig"
import { setClubsState, setClubState } from "./clubsSlice"
import { setIsLoading, setIsNotLoading } from "./utilSlice"
import { setRidesState, setRideState } from "./ridesSlice"
import { setRegionsState } from "./regionsSlice"
import { setEventsState, setEventState } from "./eventsSlice"

export const getTodos = () => async (dispatch, getState) => {
    axios.get('https://jsonplaceholder.typicode.com/todos')
        .then(response => dispatch(setTodos(response.data)))
}

export const setAppConfig = () => async (dispatch, getState) => {
    dispatch(setIsLoading())
    var res = await axiosConfig.get("/api/v1/config")
    dispatch(setConfigState(res.data))
    dispatch(setIsNotLoading())
}

// club
export const setClubs = () => async (dispatch, getState) => {
    dispatch(setIsLoading())
    dispatch(setClubsState({ data: { clubs: [] } }));
    setTimeout(async () => {
        var res = await axiosConfig.get("/api/v1/clubs")
        dispatch(setClubsState(res.data));
        dispatch(setIsNotLoading())
    }, 10)
}

export const setSelectedClub = (id) => async (dispatch, getState) => {
    if (id) {
        dispatch(setIsLoading())
        var res = await axiosConfig.get("/api/v1/club/" + id)
        dispatch(setClubState(res.data));
        dispatch(setIsNotLoading())
    }
    else {
        dispatch(setClubState({ data: { club: null } }));
    }
}

// ride
export const setRides = () => async (dispatch, getState) => {
    dispatch(setIsLoading())
    dispatch(setRidesState({ data: { rides: [] } }));
    setTimeout(async () => {
        var res = await axiosConfig.get("/api/v1/rides")
        dispatch(setRidesState(res.data));
        dispatch(setIsNotLoading())
    }, 10)
}

export const setClubRides = (clubId) => async (dispatch, getState) => {
    dispatch(setRidesState({ data: { rides: [] } }));
    if (clubId) {
        dispatch(setIsLoading())
        var res = await axiosConfig.get(`/api/v1/club/${clubId}/rides`)
        dispatch(setRidesState(res.data));
        dispatch(setIsNotLoading())
    }
}

export const setSelectedRide = (id) => async (dispatch, getState) => {
    if (id) {
        dispatch(setIsLoading())
        var res = await axiosConfig.get("/api/v1/ride/" + id)
        dispatch(setRideState(res.data));
        dispatch(setIsNotLoading())
    }
    else {
        dispatch(setRideState({ data: { ride: null } }));
    }
}

export const setRegions = (id) => async (dispatch, getState) => {
    dispatch(setIsLoading())
    var res = await axiosConfig.get("/api/v1/regions")
    dispatch(setRegionsState(res.data));
    dispatch(setIsNotLoading())
}

export const setSelectedEvent = (id) => async (dispatch, getState) => {
    if (id) {
        dispatch(setIsLoading())
        var res = await axiosConfig.get("/api/v1/event/" + id)
        dispatch(setEventState(res.data));
        dispatch(setIsNotLoading())
    }
    else {
        dispatch(setEventState({ data: { event: null } }));
    }
}

export const setClubEvents = (clubId) => async (dispatch, getState) => {
    dispatch(setEventsState({ data: { events: [] } }));
    if (clubId) {
        dispatch(setIsLoading())
        var res = await axiosConfig.get(`/api/v1/club/${clubId}/events`)
        dispatch(setEventsState(res.data));
        dispatch(setIsNotLoading())
    }
}



