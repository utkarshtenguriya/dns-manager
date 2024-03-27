import { FC, useState, ChangeEventHandler } from "react";
import FormInput from "../components/FormInput";

const LogIn: FC = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const handleInputChanged: ChangeEventHandler<HTMLInputElement> = ({
    target: { name, value },
  }) => {
    setInput({ ...input, [name]: value });
    console.log(input);
  };

  return (
    <div>
      <form onSubmit={() => {}}>
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
            SignIn
          </button>
        </div>
      </form>
    </div>
  );
};

export default LogIn;
