import { configureStore } from "@reduxjs/toolkit";
import counterReducer from './counterSlice'
import { appConfigReducer } from './appConfigSlice'
import { userSliceReducer } from "./userSlice";

// add reducers here
export const store = configureStore({
        reducer: {
            counter: counterReducer,
            appConfig: appConfigReducer,
            user: userSliceReducer,
        }
    }
)
