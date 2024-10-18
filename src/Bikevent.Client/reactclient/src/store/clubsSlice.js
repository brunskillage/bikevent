import { createSlice } from '@reduxjs/toolkit'

export const clubsSlice = createSlice({
  name: 'clubs',
  initialState: {clubs:[], selectedClub:{}},
  reducers: {
    setClubsState: (state, action) => {
        return {...state, clubs:action.payload.data.clubs}
    },
    setClubState: (state, action) => {
        return {...state, selectedClub:action.payload.data.club}
    }
  }
})

// add new functions here
export const { setClubsState, setClubState } = clubsSlice.actions
export const clubsReducer = clubsSlice.reducer