import { ChangeEventHandler, FC, FormEventHandler, useState } from "react";
import FormInput from "./FormInput";
import axios from "axios";
import { useDispatch } from "react-redux";
import { closeModal } from "../app/slices/modalSlice";
import { useNavigate } from "react-router-dom";
import { setUserLoggedIn } from "../app/slices/userSlice";

const SignUp: FC = () => {
  const dispatch = useDispatch();
  const [input, setInput] = useState({
    username: "",
    email: "",
    password: "",
    confirm_password: "",
  });
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

    setInput({
      username: "",
      email: "",
      password: "",
      confirm_password: "",
    });

    if (input.password !== input.confirm_password) {
      alert("Password mismatch!!!");
    } else {
      const response = await axios
        .post("/api/v1/user/register", input)
        .then((res) => res.data);

      if (!response) {
        throw new Error("Registration failed!!!");
      }

      console.log(response);
      dispatch(setUserLoggedIn({ email: response.email, isLoggedIn: true }));
      setLoading(false);
      dispatch(closeModal());
      navigate("/dashboard");
    }
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <div>
          <FormInput
            inputChangeHandler={handleInputChanged}
            inputValue={input?.username}
            label="Username"
            type="text"
            children="Username"
            placeholder="username"
          />
        </div>
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
        <div>
          <FormInput
            inputChangeHandler={handleInputChanged}
            inputValue={input?.confirm_password}
            label="confirm_password"
            type="password"
            children="Confirm Password"
            placeholder="●●●●●●●●●●"
          />
        </div>
        <div className="flex justify-center">
          <button
            className="py-1 px-4 rounded-md bg-pink-700 text-white font-semibold my-4"
            disabled={loading ? true : false}
          >
            {loading ? "Loading..." : "SignUp"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
