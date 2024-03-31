import { FC } from "react";
import LogIn from "../components/LogIn";
import { useDispatch, useSelector } from "react-redux";
import { ModalConst } from "../constants";
import SignUp from "../components/SignUp";
import { closeModal, toggleField } from "../app/slices/modalSlice";
import { RxCross2 } from "react-icons/rx";
import { AppStore } from "../@types";

const Modal: FC = () => {
  const dispatch = useDispatch();
  const { toggle, target } = useSelector((state: AppStore) => state.modal);

  const handleToggle = (e: any) => {
    if (e.target.name == ModalConst.SIGNIN) {
      dispatch(toggleField(ModalConst.SIGNIN))
    }
    if (e.target.name == ModalConst.SIGNUP) {
      dispatch(toggleField(ModalConst.SIGNUP))

    }
    // console.log(selectedModal, toggle);
  };

  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  return (
    <>
      <div className="px-6 py-3 shadow-md border rounded-md w-[28%] fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] bg-white z-50">
        <div className="flex justify-evenly my-4">
          <button
            className={`px-12 py-1 text-white ${
              /*(toggle == true && selectedModal == ModalConst.SIGNIN) ||*/ toggle == true && target == ModalConst.SIGNIN
                ? "bg-pink-700 font-semibold"
                : "bg-neutral-400"
            } rounded-md`}
            onClick={handleToggle}
            name={ModalConst.SIGNIN}
          >
            SignIn
          </button>
          <button
            className={`px-12 py-1 text-white ${
              /*(toggle == true && selectedModal == ModalConst.SIGNUP) ||*/ toggle == true && target == ModalConst.SIGNUP
                ? "bg-pink-700 font-semibold"
                : "bg-neutral-400"
            } rounded-md`}
            onClick={handleToggle}
            name={ModalConst.SIGNUP}
          >
            SignUp
          </button>
          <RxCross2
            className="cursor-pointer hover:bg-red-500 hover:text-white p-1 rounded-md text-2xl absolute right-3 top-3"
            onClick={handleCloseModal}
          />
        </div>
        {toggle == true && target == ModalConst.SIGNIN ? (
          <LogIn />
        ) : (
          <SignUp />
        )}
      </div>
      <div
        id="overlay"
        className="fixed top-0 bottom-0 left-0 right-0 bg-[rgba(0,0,0,0.3)]  backdrop-blur-[2px] pointer-events-auto"
      />
    </>
  );
};

export default Modal;
