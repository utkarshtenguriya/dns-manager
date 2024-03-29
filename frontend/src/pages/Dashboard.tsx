import { ChangeEventHandler, FC, Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Store } from "../@types";
import { LiaEditSolid } from "react-icons/lia";
import { AiOutlineDelete } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { createRecords, deleteRecords, refreshRecords, updateRecords } from "../app/slices/recordSlice";
import { useFetchRecords } from "../hooks/fetchRecords";
import axios from "axios";



const Dashboard: FC = () => {
  const data = useSelector((state: Store) => state.records.data);
  const dispatch = useDispatch();

  const [input, setInput] = useState<{
    id?: string;
    Type: string;
    Name: string;
    ResourceRecords: [any] | null;
    TTL: number;
  }>({
    id: "",
    Type: "",
    Name: "",
    ResourceRecords: null,
    TTL: -1,
  });


  useEffect(() => {
    

    const fetchDataHandler = async () => {
      const response = await axios.post("/api/v1/record/fetch", {hosted_zone_id: "Z07606197CFJOFVEV7H2"}).then(res => res.data)

      const {data} = response
      
      dispatch(refreshRecords(data))

      console.log(data[0]);
      
    }

    // console.log(fetchDataHandler());
    
    fetchDataHandler()
  }, [])



  const handleInputChanged: ChangeEventHandler<HTMLInputElement> = ({
    target: { name, value },
  }) => {
    if (name == "ResourceRecords") {
      setInput({ ...input, [name as string]: value.split(",") });
    } else {
      setInput({ ...input, [name]: value });
    }
    console.log(input);
  };

  const handleClearInput = () => {
    setInput({
      Type: "",
      Name: "",
      ResourceRecords: null,
      TTL: -1,
    });
  };

  const handleUpdateRecord = () => {
    dispatch(updateRecords(input))
    setInput(
      {
        Type: "",
        Name: "",
        ResourceRecords: null,
        TTL: -1,
      }
    )
  }

  const handleCreateRecord = async () => {

    const resources: any = input.ResourceRecords?.map(el => ({Value: el}))
    setInput({...input, ResourceRecords: resources})

    const response: any = axios.post("/api/v1/record/create", input).then(res => res.data)

    if (response.success) {
      dispatch(refreshRecords(response.data))
    }

      setInput(
        {
          id: "",
          Type: "",
          Name: "",
          ResourceRecords: null,
          TTL: -1,
        }
      )
    
  }

  return (
    <div>
      <div>
        <div className="mt-14 mb-10">
          <div>
            <div className="w-[80%] mx-auto grid grid-cols-4 py-4 px-4 shadow-sm border-2 border-slate-300 rounded-md">
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
                  IP:
                </label>
                <input
                  type="text"
                  className="border-2 border-slate-400 focus:outline-2 focus:outline-blue-600 rounded-md py-[1px] px-2 w-[60%]"
                  name="ResourceRecords"
                  onChange={handleInputChanged}
                  value={input.ResourceRecords|| ""}
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
                <button className="py-[2px] px-6 bg-blue-500 font-semibold text-white rounded-md mt-5 ml-2"
                onClick={handleCreateRecord}
                >
                  Add
                </button>
                <button className="py-[2px] px-6 bg-green-600 font-semibold text-white rounded-md mt-5 ml-6"
                onClick={handleUpdateRecord}
                >
                  Update
                </button>
                <button
                  className="py-[2px] px-6 bg-red-500 font-semibold text-white rounded-md mt-5 ml-6"
                  onClick={handleClearInput}
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
              {data.map((el) => (
                <tr
                  className="even:bg-slate-200 odd:bg-slate-100 hover:bg-slate-300"
                  key={el.id}
                >
                  <td className="py-2 px-4">{el.Type}</td>
                  <td className="py-2 px-4">{el.Name}</td>
                  <td className="py-2 px-4">{el.ResourceRecords?.map((el: any, id) => <Fragment key={id}>{el.Value}<br/></Fragment>)}</td>
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
                      onClick={() => dispatch(deleteRecords(el.id))}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
