import { createSlice } from '@reduxjs/toolkit'

export const ridesSlice = createSlice({
  name: 'rides',
  initialState: {rides:[], selectedRide:{}},
  reducers: {
    setRidesState: (state, action) => {
        return {...state, rides:action.payload.data.rides}
    },
    setRideState: (state, action) => {
        return {...state, selectedRide:action.payload.data.ride}
    }
  }
})

// add new functions here
export const { setRidesState, setRideState } = ridesSlice.actions
export const ridesReducer = ridesSlice.reducer