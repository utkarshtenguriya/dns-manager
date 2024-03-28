import { ChangeEventHandler, FC, FormEventHandler, useState } from "react";
import { useDispatch } from "react-redux";
import { createRecords } from "../app/slices/recordSlice";
// import { nanoid } from "nanoid";

const RecordForm: FC = () => {
  const [input, setInput] = useState<{
    id?: string;
    type: string;
    name: string;
    ip: string;
    ttl: string;
  }>({
    type: "",
    name: "",
    ip: "",
    ttl: "",
  });

  const handleInputChanged: ChangeEventHandler<HTMLInputElement> = ({
    target: { name, value },
  }) => {
    setInput({ ...input, [name]: value });
    console.log(input);
  };

  const handleClearInput = () => {
    setInput({
      type: "",
      name: "",
      ip: "",
      ttl: "",
    });
  };
  
  const dispatch = useDispatch();

  const handleFormSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    // step1: add record to redux storage
    // input.id = nanoid()
    dispatch(createRecords(input));
    handleClearInput();
  };

  return (
    <>
      <div className="mt-14 mb-10">
        <form onSubmit={handleFormSubmit}>
          <div className="w-[80%] mx-auto grid grid-cols-4 py-4 px-4 shadow-sm border-2 border-slate-300 rounded-md">
            <div className="flex space-x-3">
              <label htmlFor="type" className="font-semibold">
                Type:
              </label>
              <input
                type="text"
                className="border-2 border-slate-400 focus:outline-2 focus:outline-blue-600 rounded-md py-[1px] px-2 w-[60%]"
                name="type"
                onChange={handleInputChanged}
                value={input.type}
              />
            </div>
            <div className="flex space-x-3">
              <label htmlFor="type" className="font-semibold">
                Name:
              </label>
              <input
                type="text"
                className="border-2 border-slate-400 focus:outline-2 focus:outline-blue-600 rounded-md py-[1px] px-2 w-[60%]"
                name="name"
                onChange={handleInputChanged}
                value={input.name}
              />
            </div>
            <div className="flex space-x-3">
              <label htmlFor="type" className="font-semibold">
                IP:
              </label>
              <input
                type="text"
                className="border-2 border-slate-400 focus:outline-2 focus:outline-blue-600 rounded-md py-[1px] px-2 w-[60%]"
                name="ip"
                onChange={handleInputChanged}
                value={input.ip}
              />
            </div>
            <div className="flex space-x-3">
              <label htmlFor="type" className="font-semibold">
                TTL:
              </label>
              <input
                type="text"
                className="border-2 border-slate-400 focus:outline-2 focus:outline-blue-600 rounded-md py-[1px] px-2 w-[60%]"
                name="ttl"
                onChange={handleInputChanged}
                value={input.ttl}
              />
            </div>
            <div className="flex">
              <button className="py-[2px] px-6 bg-blue-500 font-semibold text-white rounded-md mt-5 ml-2">
                Add
              </button>
              <button
                className="py-[2px] px-6 bg-red-500 font-semibold text-white rounded-md mt-5 ml-6"
                onClick={handleClearInput}
              >
                Clear
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default RecordForm;
