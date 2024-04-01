import { FC, useEffect } from "react";
import { API_URI, ModalConst, ProxyConfig } from "../constants";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../app/slices/modalSlice";
import { AppStore } from "../@types";
import axios from "axios";
import { setUserLoggedOut } from "../app/slices/userSlice";
import { useNavigate } from "react-router-dom";

const Navbar: FC = () => {
  const dispatch = useDispatch();
  const { isLoggedIn, email } = useSelector((state: AppStore) => state.user);
  const navigate = useNavigate()

  useEffect(() => {}, [isLoggedIn]);

  const handleClick = (e: any) => {
    if (e.target.name == ModalConst.SIGNIN) {
      dispatch(openModal(ModalConst.SIGNIN));
    }
    if (e.target.name == ModalConst.SIGNUP) {
      dispatch(openModal(ModalConst.SIGNUP));
    }
  };

  // logout handler
  const handleLogOut = async () => {
    const response = await axios
      .post(`${API_URI}/api/v1/user/logout`, null, ProxyConfig)
      .then((res) => res.data)
      .catch((err) => err.response.status);

    if (response >= 400) {
      throw new Error("Something went wrong while logout.");
    }

    if (response.success) {
      dispatch(setUserLoggedOut());
      navigate("/")
    }
  };

  return (
    <nav className="py-5 grid grid-cols-2 bg-indigo-500 text-white">
      <div>
        <div className="flex items-center space-x-2 ml-24">
          <img
            src="/dns-logo.png"
            alt="logo"
            className="w-8 h-8 p-0 border-2 border-white rounded-md"
          />
          <h1 className="text-2xl font-cursive font-semibold italic">
            DNS Route53 Manager
          </h1>
        </div>
      </div>
      <div className="flex justify-end">
        {!isLoggedIn ? (
          <div>
            <ul className="mr-24 flex space-x-9">
              <li>
                <button
                  className="py-1 px-4 rounded-md border-2 border-white hover:bg-white hover:text-indigo-600 transition-all font-semibold"
                  onClick={handleClick}
                  name={ModalConst.SIGNIN}
                >
                  SignIn
                </button>
              </li>
              <li>
                <button
                  className="py-1 px-4 rounded-md border-2 border-white hover:bg-white hover:text-indigo-600 transition-all font-semibold"
                  onClick={handleClick}
                  name={ModalConst.SIGNUP}
                >
                  SignUp
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <div className="flex items-center">
            <div className="flex justify-center items-center space-x-4 mr-16">
              <span className=" font-semibold">{email}</span>
              <button
                className="py-1 px-4 rounded-md border-2 border-white hover:bg-white hover:text-indigo-600 transition-all font-semibold"
                onClick={handleLogOut}
              >
                LogOut
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
