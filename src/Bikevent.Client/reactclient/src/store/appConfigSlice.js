import { createSlice } from '@reduxjs/toolkit'

export const appConfigSlice = createSlice({
  name: 'appConfig',
  initialState: {isDevEnvironment : true, tokenExpiryminutes: 60, isLoading: false}
  ,
  reducers: {
    setConfigState: (state, action) => {
      return action.payload;
    }
  }
})

// add new functions here
export const { setConfigState } = appConfigSlice.actions
export const appConfigReducer = appConfigSlice.reducer