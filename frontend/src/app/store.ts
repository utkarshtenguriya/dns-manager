import {configureStore} from "@reduxjs/toolkit";
import modalSlice from "./slices/modalSlice";
import userSlice from "./slices/userSlice";
// import recordSlice from "./slices/recordSlice";


export const store = configureStore(
    {
        reducer: {
            modal: modalSlice,
            user: userSlice
            // records: recordSlice,
        }
    }
)

