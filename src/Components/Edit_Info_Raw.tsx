import React, { useEffect, useState } from 'react'

const Edit_Info_Raw:React.FC = () => {

    const [rollNo,setRollNo] = useState<string>("");
    const [CompanyName,setCompanyName] = useState<string>("");
    
  return (
    <div className='h-full min-h-screen bg-slate-500/0 flex items-center 
    justify-start flex-col w-full pt-16 px-10'>
        <div className=' h-[100px] w-fit  flex items-center border-[#988f8f] 
            gap-10 border-[1px] rounded-xl p-4 max-sm:h-fit max-sm:w-[70vw] relative
            max-sm:mt-8 max-sm:gap-5 max-sm:flex-col'>
              
            <div className='flex w-[250px] flex-col gap-1'>
                <p className='block text-sm font-medium leading-6 text-gray-900'>
                Student Roll Number
                </p>
                <input required id="roll" type="text"
                value={rollNo}
                onChange={(e) => {
                    setRollNo(e.target.value.toUpperCase().trim());
                }}
                className="block w-full rounded-md py-1.5
                                text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 border-black/10
                                border-[1px] tracking-widest
                                placeholder:text-gray-400 focus:ring-2 focus:ring-inset
                                px-3  focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>

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
            <div onClick={()=>{
                if(rollNo.trim().length>0 && CompanyName.trim().length>0)
                window.location.href=`/EditInfo/${CompanyName}/${rollNo}`;
            }}  className='transition-all active:scale-105 border-black/30 
          border-[1px] select-none px-5 py-1 mt-6 rounded-xl text-md hover:cursor-pointer
           active:shadow-lg bg-teal-700 text-white' >
            Go </div>
        </div>
    </div>  
    )
}

export default Edit_Info_Raw