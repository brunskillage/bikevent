import { createSlice } from '@reduxjs/toolkit'

export const queriesSlice = createSlice({
    name: 'queries',
    initialState: { latestRides: [] },
    reducers: {
        setLatestRidesState: (state, action) => {

            return { ...state, latestRides: action.payload }
        }
    }
})

// add new functions here
export const { setLatestRidesState } = queriesSlice.actions
export const queriesReducer = queriesSlice.reducer