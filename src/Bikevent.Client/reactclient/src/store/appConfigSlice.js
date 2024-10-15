import { createSlice } from '@reduxjs/toolkit'

export const appConfigSlice = createSlice({
  name: 'appConfig',
  initialState: {
    apiDomain: "https://localhost:7186",
    isDevEnvironment: true,
    tokenExpiryMinutes: 60
  },
  reducers: {
    setConfigState: (state, action) => {
      return action.payload;
    }
  }
})

// add new functions here
export const { setConfigState } = appConfigSlice.actions
export const appConfigReducer = appConfigSlice.reducer