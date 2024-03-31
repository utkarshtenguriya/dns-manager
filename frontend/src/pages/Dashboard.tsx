import {
  ChangeEvent,
  ChangeEventHandler,
  Fragment,
  useEffect,
  useState,
} from "react";
import { DataInstanceInfr } from "../@types";
import { LiaEditSolid } from "react-icons/lia";
import { AiOutlineDelete } from "react-icons/ai";
import axios from "axios";
import { useDispatch } from "react-redux";
import { storage } from "../storage/Store";
import { FaSortAmountDownAlt, FaSortAmountUp } from "react-icons/fa";
import { setUserLoggedIn } from "../app/slices/userSlice";
import { genRecordId } from "../utils/genRecordId";
import { useVerify } from "../hooks/useVerify";

const Dashboard = () => {
  const [table, setTable] = useState<[DataInstanceInfr]>();
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<"UP" | "DOWN">("UP");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const user = useVerify();
  const [isUpdating, setIsUpdating] = useState(false);
  const [status, setStatus] = useState<
    "LOADING" | "FAILED" | "SUCCESS" | "NONE"
  >("NONE");

  const [input, setInput] = useState<{
    id?: string;
    Type: string;
    Name: string;
    ResourceRecords: [{ Value: string }] | null;
    TTL: number;
  }>({
    id: "",
    Type: "A",
    Name: "",
    ResourceRecords: null,
    TTL: 0,
  });

  // useEffect(() => {
  //   // ------------::Production::---------------//
  //   //======================================//
  //   if (user) {
  //     dispatch(setUserLoggedIn(user));
  //   }
  //   (async () => {
  //     setStatus("LOADING");
  //     const response = await axios
  //       .post("/api/v1/record/fetch")
  //       .then((res) => res.data)
  //       .catch((err) => err.response.status);

  //     console.log(response);

  //     if (response >= 400) {
  //       return setStatus("FAILED");
  //     }

  //     const { payload } = response;

  //     const data = genRecordId(payload);

  //     setTable(data as [DataInstanceInfr]);

  //     console.log(data);
  //     setStatus("SUCCESS");
  //   })();
  // }, []);

  useEffect(() => {
    if (user) {
      dispatch(setUserLoggedIn(user));
    }

    // ------------::Testing::---------------//
    //======================================//
    const data = genRecordId(storage as [DataInstanceInfr]);

    setTable(data as [DataInstanceInfr]);

    console.log(data);

    if (table) {
      setLoading(false);
    }
  }, [user]);

  const handleInputChanged: ChangeEventHandler<
    HTMLInputElement | HTMLSelectElement
  > = ({ target: { name, value } }) => {
    if (name == "ResourceRecords") {
      setInput({
        ...input,
        [name as string]: value.split(",").map((el: any) => ({ Value: el })),
      });
    } else {
      setInput({ ...input, [name]: value });
    }
    console.log(input);
  };

  const clearInputFields = () => {
    setInput({
      Type: input.Type,
      Name: "",
      ResourceRecords: null,
      TTL: 0,
    });
  };

  const sortDown = () => {
    const sorted = table
      ?.sort((a, b) => (a.Name > b.Name ? 1 : -1))
      .map((el) => el);
    setTable(sorted as any);
    setSort("UP");
  };

  const sortUp = () => {
    const sorted = table
      ?.sort((a, b) => (a.Name < b.Name ? 1 : -1))
      .map((el) => el);
    setTable(sorted as any);
    setSort("DOWN");
  };

  const handleCreateRecord = async () => {
    setStatus("LOADING");
    clearInputFields();
    
    const response: any = await axios
    .post("/api/v1/record/create", input)
    .then((res) => res.data)
    .catch((err) => err.response.status);
    
    if (response >= 400) {
      return setStatus("FAILED");
    }
    
    console.log(response.payload);
    
    const data = genRecordId(response.payload.data);
    
    setTable(data as [DataInstanceInfr]);
    setStatus("SUCCESS");
  };

  const handleDeleteRecord = async (element: DataInstanceInfr) => {
    setStatus("LOADING");
    const response = await axios
      .post("/api/v1/record/delete", element)
      .then((res) => res.data)
      .catch((err) => err.response.status);

    if (response >= 400) {
      return setStatus("FAILED");
    }
    const data = genRecordId(response.payload);

    setTable(data as [DataInstanceInfr]);
    setStatus("SUCCESS");
  };

  const handleUpdateRecord = async () => {
    setStatus("LOADING");
    const response = await axios
      .post("/api/v1/record/update", input)
      .then((res) => res.data)
      .catch((err) => err.response.status);

    if (response >= 400) {
      return setStatus("FAILED");
    }

    const data = genRecordId(response.payload);

    setTable(data as [DataInstanceInfr]);

    clearInputFields();
    setIsUpdating(false);
    setStatus("SUCCESS");
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
                {/* <input
                  type="text"
                  className="border-2 border-slate-400 focus:outline-2 focus:outline-blue-600 rounded-md py-[1px] px-2 w-[60%]"
                  name="Type"
                  onChange={handleInputChanged}
                  value={input.Type}
                /> */}
                <select
                  name="Type"
                  className="border-2 p-1 rounded-md border-slate-400"
                  onChange={handleInputChanged}
                  defaultValue={"A"}
                >
                  <option value="A" >A</option>
                  <option value="AAAA">AAAA</option>
                  <option value="CNAME">CNAME</option>
                  <option value="MX">MX</option>
                  <option value="NS">NS</option>
                  <option value="PTR">PTR</option>
                  <option value="SOA">SOA</option>
                  <option value="SRV">SRV</option>
                  <option value="TXT">TXT</option>
                  <option value="DNSSEC">DNSSEC</option>
                </select>
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
                  disabled={isUpdating}
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
                  value={input.ResourceRecords?.map((el) => el.Value) || ""}
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
              onChange={({
                target: { value },
              }: ChangeEvent<HTMLInputElement>) => {
                setSearch(value);
              }}
              value={search}
            />
            <div className="py-1 px-4 font-semibold text-slate-500 text-lg border-2 border-slate-400 rounded-md">
              Records:
              {
                table?.filter((el: any) =>
                  search.toLowerCase() === ""
                    ? el
                    : el.Name.toLowerCase().includes(search)
                ).length
              }
            </div>
              
            <div
              className={`py-0 px-3 border-2 font-semibold flex justify-center items-center ${
                status == "SUCCESS"
                  ? "text-green-600 border-green-600"
                  : status == "FAILED"
                  ? "text-red-600 border-red-600"
                  : "text-slate-400 border-slate-400"
              } rounded-md`}
            >
              <span>{status}</span>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="flex justify-center">
          <table className="w-[80%] mt-2 mb-24">
            <thead className=" bg-blue-500 text-white text-left">
              <tr className="space-x-24">
                <th className="py-3 px-4 cursor-pointer hover:bg-blue-600 text-lg">
                  Type
                </th>
                <th className="py-3 px-4 cursor-pointer hover:bg-blue-600 text-lg">
                  <div className="flex items-center">
                    <span>Name</span>{" "}
                    {sort == "DOWN" ? (
                      <FaSortAmountDownAlt
                        className=" font-bold text-3xl ml-2 hover:border hover:border-slate-100 rounded-md p-1"
                        onClick={sortDown}
                      />
                    ) : (
                      <FaSortAmountUp
                        className=" font-bold text-3xl ml-2 hover:border hover:border-slate-100 rounded-md p-1"
                        onClick={sortUp}
                      />
                    )}
                  </div>
                </th>
                <th className="py-3 px-4 cursor-pointer hover:bg-blue-600 w-[40%] text-xl">
                  ResourceRecords
                </th>
                <th className="py-3 px-4 cursor-pointer hover:bg-blue-600 text-lg">
                  TTL
                </th>
                <th className="py-3 px-4 cursor-pointer hover:bg-blue-600 text-center text-lg">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {table && !loading ? (
                table
                  ?.filter((el) => {
                    return search === ""
                      ? el
                      : el.Name.toLowerCase().includes(search);
                  })
                  .map((el) => (
                    <tr
                      className="even:bg-slate-200 odd:bg-slate-100 hover:bg-slate-300"
                      key={el.id}
                    >
                      <td className="py-4 px-4">{el.Type}</td>
                      <td className="py-4 px-4">{el.Name}</td>
                      <td className="py-4 px-4">
                        {el.ResourceRecords?.map((el: any, id) => (
                          <Fragment key={id}>
                            {el.Value}

                            <br />
                          </Fragment>
                        ))}
                      </td>
                      <td className="py-4 px-4">{el.TTL}</td>
                      <td className="py-4 px-4 flex justify-evenly items-center">
                        <LiaEditSolid
                          className="bg-slate-600 text-white text-2xl py-1 px-2 rounded-md w-10 hover:cursor-pointer"
                          onClick={() => {
                            setIsUpdating(true);
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
                  ))
              ) : (
                <tr>
                  <td
                    className="text-3xl text-slate-600 table-cell text-center py-5 animate-pulse transition-all"
                    colSpan={5}
                  >
                    Loading...
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* {toggle && (
          <ModalProvider>
            <SuccessModal />
          </ModalProvider>
        )} */}
      </div>
    </div>
  );
};

export default Dashboard;
