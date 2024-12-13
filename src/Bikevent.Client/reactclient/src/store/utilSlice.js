import { createSlice } from '@reduxjs/toolkit'

export const utilSlice = createSlice({
  name: 'util',
  initialState: { isLoading: false, isSideBarOpen: false }
  ,
  reducers: {
    setIsLoading: (state, action) => {
      return { ...state, isLoading: true }
    },
    setIsNotLoading: (state, action) => {
      return { ...state, isLoading: false }
    },
    setError: (state, action) => {
      const error = action.payload
      return { ...state, error }
    },
    clearError: (state, action) => {
      const error = null
      return { ...state, error }
    },
    toggleSideBar: (state, action) => {
      return { ...state, isSideBarOpen: !state.isSideBarOpen }
    }
  }
})

// add new functions here
export const { setIsLoading, setIsNotLoading, setError, clearError, toggleSideBar } = utilSlice.actions
export const utilReducer = utilSlice.reducer