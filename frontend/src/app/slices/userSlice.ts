import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    email: "",
    isLoggedIn: false,
};

const userSlice = createSlice({
  initialState,
  name: "User",
  reducers: {
    setUserLoggedIn: (state, action) => {
      state.email = action.payload.email;
      state.isLoggedIn = action.payload.isLoggedIn;
    },
    setUserLoggedOut: (state) => {
      state.email = "";
      state.isLoggedIn = false;
    },
  },
});

export const { setUserLoggedIn, setUserLoggedOut } = userSlice.actions;
export default userSlice.reducer;
