import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";
import { RecordsInfr } from "../../@types";

const initialState: RecordsInfr = {
  data: [
    {
    id: nanoid(),
    Name: "www.johndoe.com",
    Type: "A",
    ResourceRecords: [{Value: "125.0.03"}],
    TTL: 300}
  ]
};

const recordSlice = createSlice({
  name: "records",
  initialState,
  reducers: {
    createRecords: (state, action) => {
      
        action.payload.id = nanoid();
        state.data.push(action.payload);
      
    },
    updateRecords: (state, action) => {
      const index = state.data.findIndex((el: any) => el.id == action.payload.id);
      if (index > -1) state.data[index] = action.payload;
    },
    deleteRecords: (state: any, action) => {
      state.data = state.data.filter((el: any) => el.id != action.payload);
    },
    refreshRecords: (state, action) => {
      state.data = action.payload.map((el: any) => {
        el.id = nanoid()
        return el
      })
      state.data = action.payload
    }
  },
});

export const { createRecords, updateRecords, deleteRecords, refreshRecords } =
  recordSlice.actions;

export default recordSlice.reducer;
