import React, { useState } from 'react'

const UpdatePacements: React.FC = () => {

  const [rollNo,setRollNo] = useState<string>("");
  const [StudentName,setStudentName] = useState<string>("");
  const [CompanyName,setCompanyName] = useState<string>("");
  const [Package,setPackage] = useState<number>();
  const [Batch, setBatch] = useState<string>("2024");

  const handleSave = () => {
    if( rollNo.trim()!=="" && StudentName.trim()!=="" && CompanyName.trim()!=="" && (Package) ){

      const Data = {
        rollNumber : rollNo,
        StudentName ,
        CompanyName,
        Package,
        Batch
      }
  
      console.log(Data);
    }
  }

  return (
    <div className='h-full min-h-screen bg-slate-500/0 flex items-center 
    justify-start flex-col w-full pt-16 px-10'>
      <div className='h-fit w-fit pt-10 px-14 flex items-center border-[#988f8f] 
          gap-5 border-[1px] rounded-xl p-4 max-sm:h-fit relative
          max-sm:mt-8 max-sm:gap-5 flex-col max-sm:items-center'>
        <div className='flex flex-wrap justify-between gap-10 max-sm:gap-7'>
          {/* Student Roll Number */}
          <div className='flex w-[250px] flex-col gap-1'>
            <p className='block text-sm font-medium leading-6 text-gray-900'>
              Student Roll Number
            </p>
            <input required id="roll" type="text"
            value={rollNo}
              onChange={(e) => {
                setRollNo(e.target.value.toUpperCase());
              }}
              className="block w-full rounded-md py-1.5
                            text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 border-black/10
                            border-[1px] tracking-widest
                            placeholder:text-gray-400 focus:ring-2 focus:ring-inset
                            px-3  focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>

          {/* Student Name */}
          <div className='flex w-[250px] flex-col gap-1'>
            <p className='block text-sm font-medium leading-6 text-gray-900'>
              Student Name
            </p>
            <input required id="name" type="text"
            value={StudentName}
              onChange={(e) => {
                setStudentName(e.target.value.toUpperCase());
              }}
              className="block w-full rounded-md py-1.5
                            text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 border-black/10
                            border-[1px] tracking-widest
                            placeholder:text-gray-400 focus:ring-2 focus:ring-inset
                            px-3  focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
        </div>

        <div className='flex flex-wrap justify-between gap-10 max-sm:gap-7 mt-5'>
          {/* Company Name */}
          <div className='flex w-[250px] flex-col gap-1'>
            <p className='block text-sm font-medium leading-6 text-gray-900'>
              Company Name
            </p>
            <input required id="company" type="text" 
            value={CompanyName}
              onChange={(e) => {
                setCompanyName(e.target.value);
              }}
              className="block w-full rounded-md py-1.5
                            text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 border-black/10
                            border-[1px] tracking-widest
                            placeholder:text-gray-400 focus:ring-2 focus:ring-inset
                            px-3  focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>

          {/* Package */}
          <div className='flex w-[250px] flex-col gap-1'>
            <p className='block text-sm font-medium leading-6 text-gray-900'>
              Package
            </p>
            <input required id="package" type="number"
            value={Package}
              onChange={(e) => {
                setPackage(Number(e.target.value));
              }}
              className="block w-full rounded-md py-1.5
                            text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 border-black/10
                            border-[1px] tracking-widest
                            placeholder:text-gray-400 focus:ring-2 focus:ring-inset
                            px-3  focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
        </div>

        <div className='mt-5 mb-5 flex justify-around bg-black/0 w-full'>
          {/* Batch Selection */}
          <select className='w-[150px] py-2 rounded-md border-black/10
                            border-[1px] tracking-widest shadow-sm ring-1 ring-inset ring-gray-300 
                            placeholder:text-gray-400 focus:ring-2 focus:ring-inset
                            px-3 focus:ring-indigo-600 sm:text-sm sm:leading-6'
            onChange={(e) => {
              setBatch(e.target.value);
            }}
            value={Batch}>
            <option value="2020">2020</option>
            <option value="2021">2021</option>
            <option value="2022">2022</option>
            <option value="2023">2023</option>
            <option value="2024">2024</option>
          </select>
          <button  onClick={()=>{
            handleSave();
          }}  
           className='transition-all active:scale-105 border-black/30 
          border-[1px] select-none px-5 py-2 rounded-xl text-lg hover:cursor-pointer
           active:shadow-lg bg-teal-700 text-white' >
              Save
          </button>
        </div>
      </div>
    </div>
  )
}

export default UpdatePacements;
