import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 0,
    todos : []
  },
  reducers: {
    increment: state => {
      state.value += 1
    },
    decrement: state => {
      state.value -= 1
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload
    },
    setTodos: (state, action) => {
      state.todos = action.payload
    }

  }
})

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount,setTodos } = counterSlice.actions

export default counterSlice.reducer