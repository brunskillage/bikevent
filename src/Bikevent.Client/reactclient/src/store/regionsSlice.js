import { createSlice } from '@reduxjs/toolkit'

export const regionsSlice = createSlice({
  name: 'regions',
  initialState: { regions: [], selectedRegion: {} },
  reducers: {
    setRegionsState: (state, action) => {
      return { ...state, regions: action.payload.data.regions }
    }
  }
})

// add new functions here
export const { setRegionsState, setRegionstate } = regionsSlice.actions
export const regionsReducer = regionsSlice.reducer