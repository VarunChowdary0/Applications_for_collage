import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EditIcon from "./Icons/EditIcon";
import axios from "axios";
import url from "./URL/Constants";
import DeleteIcon from "./Icons/DeleteIcon";
import PopUp from "./PopUp";

const Edit_Info: React.FC = () => {
  const { rollNum } = useParams<{ rollNum: string }>();
  const { company } = useParams<{ company: string }>();

  const [name, setName] = useState<string>("");
  const [Company, setCompany] = useState<string>(company || "");
  const [packageAmount, setPackage] = useState<number>(0);
  const [branch, setBranch] = useState<string>("");

  const [ShowPopUp,setPopUp] = useState<boolean>(false);

  const getBranch = (rollNum: string) => {
    const subStr = rollNum.substring(6, 8);
    switch (subStr) {
      case "05":
        return "Computer Science and Engineering";
      case "04":
        return "Electronics and Communication Engineering";
      case "03":
        return "Mechanical Engineering";
      case "12":
        return "Information Technology";
      case "21":
        return "Aeronautical Engineering";
      case "67":
        return "Computer Science and Engineering DataScience";
      case "66":
        return "Computer Science and Engineering Artificial Intelligence";
      case "62":
        return "Computer Science and Engineering Cyber Security";
      default:
        return "";
    }
  };


  useEffect(() => {
    if (rollNum) {
      setBranch(getBranch(rollNum));
    }
  }, [rollNum]);

  useEffect(() => {
    if (rollNum && company) {
      axios.post(url + "/get-details", {
        companyName: company,
        rollNo: rollNum
      })
      .then((res) => {
        const response = res.data.data;
        console.log(response)
        if (response.length > 0) {
          setName(response[0].name);
          setPackage(response[0].package);
        }    
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }, [rollNum, company]);

  const [message, setMessage] = useState<string | null>(null);

  const handleUpdate = () => {
    axios.post(url + "/update-details", {
      companyName: Company,
      rollNo: rollNum,
      name: name,
      packageAmount: packageAmount
    })
    .then((res) => {
      if (res.status === 200) {
        setMessage("Update successful!");
        setTimeout(() => {
          setMessage("");
        }, 1500); 
      }
    })
    .catch((err) => {
      console.log(err);
      setMessage("Update failed. Please try again.");
    });
  };


  const DeleteRecord = () => {
    // Optionally disable UI elements here to prevent multiple submissions
    
    axios.post(url + "/delete-record", {
      companyName: company,
      rollNo: rollNum
    })
      .then((res) => {
        console.log(res.data);
        
        setPopUp(false);
  
        setTimeout(() => {
          window.location.href = "/placements";
        }, 1500);  
      })
      .catch((err) => {
        console.error("Error deleting record:", err);
  
        setPopUp(false);
        setMessage("Failed to Delete Record, Please try again!");
        setTimeout(() => {
          setMessage("");
        }, 2000);
      });
  };
  

  return (
    <div className="h-full min-h-screen bg-slate-500/0 flex items-center justify-start flex-col w-full pt-16 px-10">
      <div className="h-fit w-fit shadow-xl overflow-hidden bg-white dark:text-white max-sm:w-[80vw] rounded-md relative">
        <div className="absolute h-[150px] w-[150px] top-[20%] max-sm:top-[100px] bg-[#4c4b4b] max-sm:scale-75 left-1 max-sm:left-[-10px] rounded-full overflow-hidden z-30">
          <img
            className="select-none"
            src={`https://iare-data.s3.ap-south-1.amazonaws.com/uploads/STUDENTS/${rollNum}/${rollNum}.jpg`}
            alt="Student"
          />
        </div>
        <div className="h-[180px] max-sm:h-[200px] mr-[170px] text-3xl font-bold text-white flex items-center justify-end pr-5 max-sm:items-start max-sm:pt-[50px] w-full bg-gradient-to-r from-[#79d98c] to-[#a28ef1] max-md:text-2xl relative">
          {rollNum}
          <p className="max-sm:w-[40vw] text-sm absolute bottom-0 max-w-[320px]">{branch}</p>
        </div>
        <div className="h-[40%] w-full">
          <div className="ml-[150px] pl-1 text-lg max-sm:ml-2 max-sm:mt-14 text-black font-light mt-5 flex flex-col gap-5">
            <div className="flex items-center justify-between gap-5 pr-10 max-sm:pr-3">
              <input
                className="active:border-b-2 tracking-wider border-b-amber-600 outline-none"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value.toUpperCase())}
              />
              <div className="flex items-center min-w-[100px]">
                <p className="pr-3 max-sm:text-[10px] w-fit select-none text-sm">Edit Name</p>
                <EditIcon height={15} width={15} />
              </div>
            </div>
            <div className="flex items-center justify-between gap-5 pr-10 max-sm:pr-3">
              <input
                className="active:border-b-2 tracking-wider border-b-amber-600 max-sm:truncate outline-none"
                type="text"
                value={Company}
                onChange={(e) => setCompany(e.target.value)}
              />
              <div className="flex items-center mb-2">
                <p className="pr-3 max-sm:text-[10px] leading-3 select-none text-sm">Company Name</p>
                <EditIcon height={15} width={15} />
              </div>
            </div>
            <div className="flex items-center justify-between gap-5 pr-10 max-sm:pr-3">
              <div className="flex">
                <input
                  className="bg-black/0 w-[50px] active:border-b-2 px-1 tracking-wider border-b-amber-600 outline-none"
                  type="number"
                  value={packageAmount}
                  onChange={(e) => setPackage(Number(e.target.value))}
                />
                <div className="">LPA</div>
              </div>
              <div className="flex items-center">
                <p className="pr-3 max-sm:text-[10px] w-fit select-none text-sm">Package Amount</p>
                <EditIcon height={15} width={15} />
              </div>
            </div>
          </div>
          <div className="mt-4 p-2 w-full h-full flex flex-row flex-wrap gap-4 pb-5"></div>
        </div>
        <div className="h-10"></div>
        <div className="flex items-center justify-center h-16 absolute bottom-0 w-full bg-black/0">
          <div
            className="select-none active:scale-75 transition-all px-7 py-2 rounded-md bg-[#a38cf3]"
            onClick={handleUpdate}
          >
            Update
          </div>
        </div>
        <div onClick={()=>{
          setPopUp(true);
                }}  className=' absolute bottom-4 right-4 hover:scale-110 active:scale-90  max-sm:scale-[0.7] 
                hover:cursor-pointer transition-all  p-2 rounded-full bg-[#d6d4d4]'>
                    <DeleteIcon height={20} width={20}/>
                </div>
      </div>

      <div className=" text-green-700 w-full h-[50px] bg-black/0 mt-10 text-center">
      {message}</div>
      <>
      {
        ShowPopUp  && 
            <PopUp 
                  callFunction={DeleteRecord} 
                  setShow={setPopUp} 
                  message={`Delete ${rollNum}'s record in ${company}`}/>
      }
      </>
    </div>
  );
};

export default Edit_Info;
