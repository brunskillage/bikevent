import { createSlice } from '@reduxjs/toolkit'

export const clubsSlice = createSlice({
  name: 'clubs',
  initialState: {clubs:[]}
  ,
  reducers: {
    setClubsState: (state, action) => {
        return {...state, clubs:action.payload.data.clubs}
    }
  }
})

// add new functions here
export const { setClubsState } = clubsSlice.actions
export const clubsReducer = clubsSlice.reducer