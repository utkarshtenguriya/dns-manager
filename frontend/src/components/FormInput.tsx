import { ChangeEventHandler, FC, ReactNode } from "react";


interface InputProps {
  children?: ReactNode;
  label: string;
  type: string;
  inputValue: string;
  inputChangeHandler: ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
}

const FormInput: FC<InputProps> = ({
  children,
  label,
  type,
  inputChangeHandler,
  inputValue,
  placeholder
}) => {
  return (
    <div className="grid grid-flow-col justify-between items-center space-y-2 my-1.5">
      <label htmlFor={label.toLocaleLowerCase()}>{children}</label>
      <input
        type={type}
        onChange={inputChangeHandler}
        value={inputValue}
        autoComplete="true"
        className="w-full focus-visible:outline-1 focus-visible:outline-blue-400 focus-visible:shadow focus-visible:shadow-blue-400 border-none dark:bg-transparent outline outline-1 rounded-sm transition-all px-2 py-[2px]"
        name={label.toLocaleLowerCase()}
        placeholder={placeholder}
      />
    </div>
  );
};

export default FormInput;
