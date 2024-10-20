import { createSlice } from '@reduxjs/toolkit'

export const ridesSlice = createSlice({
  name: 'rides',
  initialState: {rides:[], selectedRide:{}},
  reducers: {
    setRidesState: (state, action) => {
        return {...state, rides:action.payload.data.rides}
    },
    setRidestate: (state, action) => {
        return {...state, selectedRides:action.payload.data.Rides}
    }
  }
})

// add new functions here
export const { setRideState, setRidesState } = ridesSlice.actions
export const ridesReducer = ridesSlice.reducer