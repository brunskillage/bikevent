import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    email: "",
    userName: "",
    isLoggedIn: false
  },
  reducers: {
    setUserState: (state, action) => {
      return action.payload;
    }
  }
})

// Action creators are generated for each case reducer function
export const { setUserState } = userSlice.actions

export const userSliceReducer =  userSlice.reducer