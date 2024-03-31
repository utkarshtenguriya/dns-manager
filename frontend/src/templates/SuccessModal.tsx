import { useDispatch } from "react-redux";
import { closeModal } from "../app/slices/modalSlice";

const SuccessModal = () => {
    const dispatch = useDispatch()

  return (
    <>
      <div className="px-6 py-3 shadow-md border rounded-md w-[28%] fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] bg-white z-50">
        <div className="flex justify-center mb-3">
          <img
            className="w-[240px]"
            src="/success.png"
            alt="sucess-modal-img"
          />
        </div>
        <div className="text-center mb-3">
          <h4 className="text-slate-600 font-semibold text-xl">Welcome to DNS manager!!!</h4>
          <p className="text-slate-600 text-sm">Manage your Domain Name Records easy in tabular format.</p>
        </div>
        <div className="flex justify-center my-2">
          <button
            className="py-[2px] px-3 bg-green-700 text-white font-semibold rounded-md"
            onClick={() => dispatch(closeModal())}
          >
            Ok
          </button>
        </div>
      </div>
      <div
        id="overlay"
        className="fixed top-0 bottom-0 left-0 right-0 bg-[rgba(0,0,0,0.3)]  backdrop-blur-[2px] pointer-events-auto"
      />
    </>
  );
};

export default SuccessModal;
