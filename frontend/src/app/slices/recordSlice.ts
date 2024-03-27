import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";

const initialState = {
  data: [
    {
      id: nanoid(),
      type: "TXT",
      name: "www.example.com",
      ip: "192.0.1.16",
      ttl: "auto",
    },
    {
      id: nanoid(),
      type: "A",
      name: "www.google.com",
      ip: "192.0.0.0",
      ttl: "auto",
    },
    {
      id: nanoid(),
      type: "AAA",
      name: "www.Yahoo.com",
      ip: "192.34.50.10",
      ttl: "auto",
    },
    {
      id: nanoid(),
      type: "CNAME",
      name: "www.amazon.com",
      ip: "192.2.9.0",
      ttl: "auto",
    },
  ],
};

const recordSlice = createSlice({
  name: "records",
  initialState,
  reducers: {
    createRecords: (state, action) => {
        action.payload.id = nanoid()
      state.data.push(action.payload);
    },
    getRecords: (state) => {},
    updateRecords: (state) => {},
    deleteRecords: (state, action) => {
        state.data = state.data.filter(el => el.id != action.payload)
    },
  },
});

export const { createRecords, getRecords, updateRecords, deleteRecords } =
  recordSlice.actions;

export default recordSlice.reducer;
