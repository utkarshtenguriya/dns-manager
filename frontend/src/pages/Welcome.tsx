import { FC } from "react";
import ModalProvider from "../utils/ModalProvider";
import Modal from "../templates/Modal";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../app/slices/modalSlice";
import { ModalConst } from "../constants";

const Welcome: FC = () => {
  const dispatch = useDispatch()
  const { toggle } = useSelector((state: Store) => state.modal);

  const handleClick = () => {
    dispatch(openModal(ModalConst.SIGNUP))
  }
  return (
    <>
      <div className="grid grid-cols-2 mt-8 place-items-center">
        <div>
          <img
            src="/fontimg.png"
            alt="font-image"
            className="w-[70%] mx-auto"
          />
        </div>
        <div className="w-full ">
          <div className="shadow-md rounded-md py-4 px-8 w-[60%] mx-auto border text-center">
            <h4 className="my-3 font-semibold text-2xl text-neutral-800">
              Welcome!!!
            </h4>
            <p className="text-sm my-3">
              DNS Manager empowers you to effortlessly manage your DNS with a
              user-friendly web interface for Amazon Route 53. View, edit, and
              update all your DNS records in a clear, tabular format, reducing
              errors and streamlining your workflow. Take control of your zones,
              manage all record types, and gain a comprehensive view of your DNS
              configuration - all within a single platform. Experience the power
              of DNS management made easy. Sign up today!
            </p>
            <div className="flex justify-center">
          <button 
          className="py-1 px-4 rounded-md bg-pink-700 text-white font-semibold my-4"
          onClick={handleClick}
          >
            Let's Go
          </button>
        </div>
          </div>
        </div>
      </div>
      {toggle ? (
        <ModalProvider>
          <Modal />
        </ModalProvider>
      ) : (
        <></>
      )}
    </>
  );
};

export default Welcome;
