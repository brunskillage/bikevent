import { configureStore } from "@reduxjs/toolkit";
import counterReducer from './counterSlice'
import { appConfigReducer } from './appConfigSlice'
import { userSliceReducer } from "./userSlice";
import { clubsReducer } from "./clubsSlice";
import { utilReducer } from "./utilSlice";
import { ridesReducer } from "./ridesSlice";

// add reducers here
export const store = configureStore({
        reducer: {
            counter: counterReducer,
            appConfig: appConfigReducer,
            user: userSliceReducer,
            club: clubsReducer,
            util: utilReducer,
            ride: ridesReducer
        }
    }
)
