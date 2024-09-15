import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EditIcon from "./Icons/EditIcon";

const Edit_Info: React.FC = () => {
  const { rollNum } = useParams();
  const { company } = useParams();

  const [name,setName] = useState<string>("V D P GANESH");
  const [Company,setCompany] = useState<string>(company||"");
  const [packageAmount,setPackage] = useState<number>(9);
  return (
    <div
      className="h-full min-h-screen bg-slate-500/0 flex items-center 
    justify-start flex-col w-full pt-16 px-10"
    >
      <div className=" h-fit w-fit shadow-xl overflow-hidden
          bg-white 
          dark:text-white
          max-sm:w-[80vw] rounded-md  relative">
          <div
            className=" absolute h-[150px] w-[150px] top-[20%] max-sm:top-[100px]     
             bg-[#4c4b4b] left-1 rounded-full  overflow-hidden"
          >
            <img
              className=" select-none"
              src={`https://iare-data.s3.ap-south-1.amazonaws.com/uploads/STUDENTS/${rollNum}/${rollNum}.jpg`}
              alt="RETRY"
            />
          </div>
          <div
            className=" h-[180px] 
              max-sm:h-[230px] mr-[170px]
              text-3xl font-bold text-white
              flex items-center justify-end pr-5 max-sm:items-start max-sm:pt-[50px]
              w-full bg-gradient-to-r from-[#79d98c]
              to-[#a28ef1] max-md:text-2xl "
          >
            {rollNum}
          </div>
          <div className=" h-[40%] w-full ">
            <div
              className=" ml-[150px] pl-1 text-lg 
                max-sm:ml-2 max-sm:mt-14 text-black 
                font-light mt-5 flex flex-col gap-5   "
            >
                <div className=" flex items-center justify-between gap-5 pr-10 max-sm:pr-3 ">
                  <input  className=" active:border-b-2 tracking-wider
                    border-b-amber-600
                    outline-none "
                    type="text" value={name}
                    onChange={(e)=>{
                      setName(e.target.value.toUpperCase())
                    }} />
                    <div className=" flex  items-center">
                      <p className=" pr-3 max-sm:text-[10px] w-fit select-none text-sm">Edit Name</p>
                      <EditIcon height={15} width={15}/>
                    </div>
                </div> 
                <div className=" flex items-center justify-between gap-5 pr-10 max-sm:pr-3">
                  <input  className=" active:border-b-2 tracking-wider
                    border-b-amber-600 max-sm:truncate
                    outline-none "
                    type="text" value={Company}
                    onChange={(e)=>{
                      setCompany(e.target.value)
                    }} />
                    <div className=" flex  items-center">
                      <p className=" pr-3 max-sm:text-[10px] w-fit select-none text-sm">Company Name</p>
                      <EditIcon height={15} width={15}/>
                    </div>
                </div> 
                <div className=" flex  items-center justify-between gap-5 pr-10 max-sm:pr-3">
                 <div className=" flex">
                  <input  className=" bg-black/0 w-[50px] active:border-b-2
                    px-1 tracking-wider
                      border-b-amber-600
                      outline-none "
                      type="number" value={packageAmount}
                      onChange={(e)=>{
                        setPackage(Number(e.target.value))
                      }} />
                    <div className="">LPA</div>
                 </div>
                    <div className=" flex  items-center">
                      <p className=" pr-3 max-sm:text-[10px] w-fit select-none text-sm">Package Amount</p>
                      <EditIcon height={15} width={15}/>
                    </div>
                </div> 
            </div>
            <div
              className=" mt-4 p-2 w-full h-full 
                flex flex-row flex-wrap gap-4 pb-5 
                "
            >
            </div>
          </div>
          <div className=" h-10"></div>
          <div className=" flex items-center justify-center h-16 absolute bottom-0 w-full bg-black/0">
                      <div className=" select-none active:scale-75 transition-all
                       px-7 py-2 rounded-md bg-[#a38cf3]">
                        Update
                      </div>
          </div>
      </div>
      {/* </div> */}
    </div>
  );
};

export default Edit_Info;
