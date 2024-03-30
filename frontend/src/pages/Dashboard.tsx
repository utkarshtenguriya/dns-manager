import { ChangeEventHandler, FC, Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataInstanceInfr, RecordsInfr, Store } from "../@types";
import { LiaEditSolid } from "react-icons/lia";
import { AiOutlineDelete } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import {
  updateRecords,
} from "../app/slices/recordSlice";
import axios from "axios";
import RecordForm from "../components/RecordForm";
import { nanoid } from "nanoid";

const Dashboard: FC = () => {
  // const data: [DataInstanceInfr] = useSelector((state: Store) => state.records.data);
  const dispatch = useDispatch();
  const [table, setTable] = useState<[DataInstanceInfr]>()

  const [input, setInput] = useState<{
    id?: string;
    Type: string;
    Name: string;
    ResourceRecords: [{Value: string}] | null;
    TTL: number;
  }>({
    id: "",
    Type: "",
    Name: "",
    ResourceRecords: null,
    TTL: 0,
  });

  useEffect(() => {
    const fetchDataHandler = async () => {
      const response = await axios
        .post("/api/v1/record/fetch")
        .then((res) => res.data);

      const payload: [DataInstanceInfr] = response.payload

      console.log(payload);

      const d = payload.map(el => {
        el.id = nanoid()
        return el;
      })

      setTable(d as any)
      // dispatch(refreshRecords(payload))
    };

    fetchDataHandler()
    
  },[]);

  const handleInputChanged: ChangeEventHandler<HTMLInputElement> = ({
    target: { name, value },
  }) => {
    if (name == "ResourceRecords") {
      setInput({ ...input, [name as string]: value.split(",").map((el: any) => ({Value: el})) });
    } else {
      setInput({ ...input, [name]: value });
    }
    console.log(input);
  };

  const clearInputFields = () => {
    setInput({
      Type: "",
      Name: "",
      ResourceRecords: null,
      TTL: 0,
    });
  };


  const handleCreateRecord = async () => {
    clearInputFields()

    const response: any = await axios
      .post("/api/v1/record/create", input)
      .then((res) => res.data);
      

    if (!response.success) {
      throw new Error("Something went wrong!!!")
    }
    
    console.log(response.payload);
    
    const data = response.payload.data.map((el: any) => {
      el.id = nanoid()
      return el
    })
    setTable(data)
  };


  const handleDeleteRecord = async (element: DataInstanceInfr) => {
    const response = await axios.post("/api/v1/record/delete", element).then(res => res.data)

    const data = response.payload.map((el: any) => {
      el.id = nanoid()
      return el
    })

    setTable(data)
  }

  const handleUpdateRecord = () => {
    
  };


  return (
    <div>
      <div>
        <div className="mt-14 mb-10">
          <div>
            <div className="w-[80%] table-auto mx-auto grid grid-cols-4 py-4 px-4 shadow-sm border-2 border-slate-300 rounded-md">
              <div className="flex space-x-3">
                <label htmlFor="type" className="font-semibold">
                  Type:
                </label>
                <input
                  type="text"
                  className="border-2 border-slate-400 focus:outline-2 focus:outline-blue-600 rounded-md py-[1px] px-2 w-[60%]"
                  name="Type"
                  onChange={handleInputChanged}
                  value={input.Type}
                />
              </div>
              <div className="flex space-x-3">
                <label htmlFor="type" className="font-semibold">
                  Name:
                </label>
                <input
                  type="text"
                  className="border-2 border-slate-400 focus:outline-2 focus:outline-blue-600 rounded-md py-[1px] px-2 w-[60%]"
                  name="Name"
                  onChange={handleInputChanged}
                  value={input.Name}
                />
              </div>
              <div className="flex space-x-3">
                <label htmlFor="type" className="font-semibold">
                  Resources:
                </label>
                <input
                  type="text"
                  className="border-2 border-slate-400 focus:outline-2 focus:outline-blue-600 rounded-md py-[1px] px-2 w-[60%]"
                  name="ResourceRecords"
                  onChange={handleInputChanged}
                  value={input.ResourceRecords?.map(el => el.Value) || ""}
                />
              </div>
              <div className="flex space-x-3">
                <label htmlFor="type" className="font-semibold">
                  TTL:
                </label>
                <input
                  type="text"
                  className="border-2 border-slate-400 focus:outline-2 focus:outline-blue-600 rounded-md py-[1px] px-2 w-[60%]"
                  name="TTL"
                  onChange={handleInputChanged}
                  value={input.TTL}
                />
              </div>
              <div className="flex">
                <button
                  className="py-[2px] px-6 bg-blue-500 font-semibold text-white rounded-md mt-5 ml-2"
                  onClick={handleCreateRecord}
                >
                  Add
                </button>
                <button
                  className="py-[2px] px-6 bg-green-600 font-semibold text-white rounded-md mt-5 ml-6"
                  onClick={handleUpdateRecord}
                >
                  Update
                </button>
                <button
                  className="py-[2px] px-6 bg-red-500 font-semibold text-white rounded-md mt-5 ml-6"
                  onClick={clearInputFields}
                >
                  Clear
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center my-2">
          <div className="my-2 flex space-x-4 w-[80%]">
            <input
              type="search"
              className="border-2 border-slate-400 focus:outline-2 focus:outline-blue-600 rounded-md py-[1px] px-2 w-[60%]"
              placeholder="🔍 Search records..."
            />
            <button className="bg-blue-500 text-white rounded-md">
              <BiSearch className="w-12 text-2xl" />
            </button>
          </div>
        </div>
      </div>
      <div>
        <div className="flex justify-center">
          <table className="w-[80%] mt-2 h-[256px] mb-24">
            <thead className=" bg-blue-500 text-white text-left">
              <tr className="space-x-24">
                <th className="py-2 px-4 cursor-pointer hover:bg-blue-600">
                  Type
                </th>
                <th className="py-2 px-4 cursor-pointer hover:bg-blue-600">
                  Name
                </th>
                <th className="py-2 px-4 cursor-pointer hover:bg-blue-600 w-[40%]">
                  ResourceRecords
                </th>
                <th className="py-2 px-4 cursor-pointer hover:bg-blue-600">
                  TTL
                </th>
                <th className="py-2 px-4 cursor-pointer hover:bg-blue-600 text-center">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              { table ? table?.map((el) => (
                <tr
                  className="even:bg-slate-200 odd:bg-slate-100 hover:bg-slate-300"
                  key={el.id}
                >
                  <td className="py-2 px-4">{el.Type}</td>
                  <td className="py-2 px-4">{el.Name}</td>
                  <td className="py-2 px-4">
                    {el.ResourceRecords?.map((el: any, id) => (
                      <Fragment key={id}>
                        {el.Value}
                        <br />
                      </Fragment>
                    ))}
                  </td>
                  <td className="py-2 px-4">{el.TTL}</td>
                  <td className="py-2 px-4 flex justify-evenly items-center">
                    <LiaEditSolid
                      className="bg-slate-600 text-white text-2xl py-1 px-2 rounded-md w-10 hover:cursor-pointer"
                      onClick={() => {
                        setInput(el as any);
                        console.log(el);
                      }}
                    />
                    <AiOutlineDelete
                      className="bg-red-500 text-white text-2xl py-1 px-2 rounded-md w-10 hover:cursor-pointer"
                      onClick={() => handleDeleteRecord(el)}
                    />
                  </td>
                </tr>
              )):
                <tr>
                  <td >Loading...</td >
                </tr>
            }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
