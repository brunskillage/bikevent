import axios from "axios"
import { setTodos } from "./counterSlice"
import { setConfigState } from "./appConfigSlice"
import axiosConfig from "../lib/axiosConfig"
import { setClubsState, setClubState } from "./clubsSlice"
import { setIsLoading, setIsNotLoading } from "./utilSlice"

export const getTodos = () =>  async (dispatch, getState) => {
    axios.get('https://jsonplaceholder.typicode.com/todos')
       .then(response => dispatch(setTodos(response.data)))
}

export const setAppConfig = () =>  async (dispatch, getState) => {
    dispatch(setIsLoading())
    axiosConfig.get("/api/v1/config")
        .then(response => {
            dispatch(setConfigState(response.data))
            dispatch(setIsNotLoading())
        })
}

export const setClubs = () =>  async (dispatch, getState) => {
    dispatch(setIsLoading())
    dispatch(setClubsState({data: {clubs:[]}}));
    setTimeout(async () => {
       var res = await axiosConfig.get("/api/v1/clubs")
       dispatch(setClubsState(res.data));
       dispatch(setIsNotLoading())
    },200)

}

export const setSelectedClub = (id) =>  async (dispatch, getState) => {
    if(id){
        dispatch(setIsLoading())
        var res = await axiosConfig.get("/api/v1/club/" + id)
        dispatch(setClubState(res.data));
    }
    else {
        dispatch(setClubState({data: {club:{}}}));
    }

}