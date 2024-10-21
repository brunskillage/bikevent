import { createSlice } from '@reduxjs/toolkit'
import { Auth } from '../lib/dataObjects';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    email:"",
    isLoggedIn: false,
    userName: "",
    token:"",
    userId: 0
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