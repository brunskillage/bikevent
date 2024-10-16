import { createSlice } from '@reduxjs/toolkit'

export const utilSlice = createSlice({
  name: 'util',
  initialState: {isLoading: false}
  ,
  reducers: {
    setIsLoading: (state, action) => {
        return {...state, isLoading: true}
    },
    setIsNotLoading: (state, action) => {
        return {...state, isLoading: false}
    }
  }
})

// add new functions here
export const { setIsLoading, setIsNotLoading } = utilSlice.actions
export const utilReducer = utilSlice.reducer