import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { PlannersReducer } from "./api";
import thunk from "redux-thunk";
import { planneryApi } from "../components/apiClient";

// STORE CONFIG
export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [planneryApi.reducerPath]: planneryApi.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(planneryApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
