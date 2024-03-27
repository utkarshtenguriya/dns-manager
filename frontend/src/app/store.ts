import {configureStore} from "@reduxjs/toolkit";
import modalSlice from "./slices/modalSlice";
import recordSlice from "./slices/recordSlice";


export const store = configureStore(
    {
        reducer: {
            modal: modalSlice,
            records: recordSlice
        }
    }
)

