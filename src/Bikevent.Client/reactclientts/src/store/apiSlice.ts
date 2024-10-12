// import React from "react";
// import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
// import type { RootState } from "./store";

// import { IPlannerRow } from "../dataObjects";

// // INIT STATE
// // interface
// interface ApiState {
//   todos: IPlannerRow[];
// }

// const initialState: ApiState = {
//   todos: [],
// };

// // The function below is called a thunk and allows us to perform async logic. It
// // can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// // will call the thunk with the `dispatch` function as the first argument. Async
// // code can then be executed and other actions can be dispatched. Thunks are
// // typically used to make async requests.
// export const getPlannersAsync = createAsyncThunk("getPlanners", async (amount: number) => {
//   const response = await fetch("https://localhost:7259/api/planners");
//   // The value we return becomes the `fulfilled` action payload
//   return response.json();
// });

// // REDUCERS
// export const apiSlice = createSlice({
//   name: "apiReducers",
//   initialState,
//   reducers: {
//     getPlanners: (state, action: PayloadAction<IPlannerRow>) => {
//       console.log("test");
//       state.todos.push(action.payload);
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(getPlannersAsync.pending, (state) => {
//         state. = "loading";
//       })
//       .addCase(getPlannersAsync.fulfilled, (state, action) => {
//         state.status = "idle";
//         state.value += action.payload;
//       })
//       .addCase(getPlannersAsync.rejected, (state) => {
//         state.status = "failed";
//       });
//   },
// });

// // ACTIONS EXPORT
// export const { getPlanners } = apiSlice.actions;

// // SELECTORS
// export const getTodos = (state: RootState) => state.todos;

// // REDUCER EXPORT
// export default apiSlice.reducer;
