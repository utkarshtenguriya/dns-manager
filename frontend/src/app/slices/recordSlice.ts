import { Store, createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";
import { DataInstanceInfr, RecordsInfr } from "../../@types";
import axios from "axios";

const initialState: RecordsInfr = {
  data: [
    {
      id: nanoid(),
      Name: "www.johndoe.com",
      Type: "A",
      ResourceRecords: [{ Value: "125.0.03" }],
      TTL: 300,
    },
  ],
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
      const index = state.data.findIndex(
        (el: any) => el.id == action.payload.id
      );
      if (index > -1) state.data[index] = action.payload;
    },

    deleteRecords: (state: RecordsInfr, action) => {
      (async () => {
        const index = state.data.findIndex((el) => el.id == action.payload)
        if (index == -1) {
          throw new Error("Cannot find the element to be deleted");
        }

        const elem = state.data[index]

        console.log(index);
        


        // const response = await axios
        //   .post("/api/v1/record/delete", elem)
        //   .then((res) => res.data);

        // const data = response.payload;

        // if (!data) {
        //   throw new Error("Axios error while deleting...");
        // }

        // state.data = data;
      })();
    },

    refreshRecords: (state, action) => {
      state.data = action.payload.map((el: any) => {
        el.id = nanoid();
        return el;
      });
      state.data = action.payload;
    },
  },
});

export const { createRecords, updateRecords, deleteRecords, refreshRecords } =
  recordSlice.actions;

export default recordSlice.reducer;
