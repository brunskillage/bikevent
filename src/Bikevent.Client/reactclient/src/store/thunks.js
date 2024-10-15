import axios from "axios"
import { setTodos } from "./counterSlice"
import { setConfigState } from "./appConfigSlice"
import axiosConfig from "../lib/apiClientConfig"

export const getTodos = () =>  async (dispatch, getState) => {
    axios.get('https://jsonplaceholder.typicode.com/todos')
       .then(response => dispatch(setTodos(response.data)))
}

export const setAppConfig = () =>  async (dispatch, getState) => {
    axiosConfig.get("/api/v1/config")
        .then(response => dispatch(setConfigState(response.data)))
}