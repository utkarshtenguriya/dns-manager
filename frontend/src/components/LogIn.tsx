import { FC, useState, ChangeEventHandler, FormEventHandler } from "react";
import FormInput from "../components/FormInput";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUserLoggedIn } from "../app/slices/userSlice";
import { API_URI } from "../constants";

const LogIn: FC = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChanged: ChangeEventHandler<HTMLInputElement> = ({
    target: { name, value },
  }) => {
    setInput({ ...input, [name]: value });
    console.log(input);
  };

  const handleFormSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    setLoading(true);

    const response = await axios
      .post(API_URI + "/api/v1/user/login", input)
      .then((res) => res.data);

    if (!response) {
      throw new Error("Login error");
    }

    console.log(response.payload.user.email);

    dispatch(
      setUserLoggedIn({ email: response.payload.user.email, isLoggedIn: true })
    );
    navigate("/dashboard");
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <div>
          <FormInput
            inputChangeHandler={handleInputChanged}
            inputValue={input?.email}
            label="Email"
            type="email"
            children="Email ID"
            placeholder="example@gmail.com"
          />
        </div>
        <div>
          <FormInput
            inputChangeHandler={handleInputChanged}
            inputValue={input?.password}
            label="Password"
            type="password"
            children="Password"
            placeholder="●●●●●●●●●●"
          />
        </div>
        <div className="flex justify-center">
          <button className="py-1 px-4 rounded-md bg-pink-700 text-white font-semibold my-4">
            {loading ? "Loading..." : "SignIn"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default LogIn;
