import axios from "axios"
import { setTodos } from "./counterSlice"
import { setConfigState } from "./appConfigSlice"

export const getTodos = () =>  async (dispatch, getState) => {
    axios.get('https://jsonplaceholder.typicode.com/todos')
       .then(response => dispatch(setTodos(response.data)))
}

export const setAppConfig = () =>  async (dispatch, getState) => {
    axios.get("https://localhost:7186/api/v1/config")
        .then(response => dispatch(setConfigState(response.data)))
}