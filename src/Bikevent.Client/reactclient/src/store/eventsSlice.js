import { createSlice } from '@reduxjs/toolkit'

export const eventsSlice = createSlice({
  name: 'events',
  initialState: { events: [], selectedEvent: {} },
  reducers: {
    setEventsState: (state, action) => {
      return { ...state, events: action.payload.data.events }
    },
    setEventState: (state, action) => {
      return { ...state, selectedEvent: action.payload.data.event }
    }
  }
})

// add new functions here
export const { setEventsState, setEventState } = eventsSlice.actions
export const eventsReducer = eventsSlice.reducer 