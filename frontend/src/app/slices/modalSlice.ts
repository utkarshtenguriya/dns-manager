import { createSlice } from "@reduxjs/toolkit";
import { ModalConst } from "../../constants";
import { ModalInitialStateInfr } from "../../@types";

const initialState: ModalInitialStateInfr = {
  toggle: false,
  target: ModalConst.SIGNUP,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.toggle = true;
      if (action.payload == ModalConst.SIGNIN) {
        state.target = ModalConst.SIGNIN;
      } 
      if (action.payload == ModalConst.SIGNUP) {
        state.target = ModalConst.SIGNUP;
        
      }
    },
    closeModal: (state) => {
      state.toggle = false
      state.target = ""
    },
    toggleField: (state, action) => {
      if (action.payload == ModalConst.SIGNIN) {
        state.target = ModalConst.SIGNIN
      }
      if (action.payload == ModalConst.SIGNUP) {
        state.target = ModalConst.SIGNUP
      }
    }
  },
});

export const { closeModal, openModal, toggleField } = modalSlice.actions;
export default modalSlice.reducer;
