import axios from 'axios';
import url from './URL/Constants';
import React, { useEffect, useState } from 'react'

const UpdatePacements: React.FC = () => {

  const [rollNo,setRollNo] = useState<string>("");
  const [StudentName,setStudentName] = useState<string>("");
  const [CompanyName,setCompanyName] = useState<string>("");
  const [Package,setPackage] = useState<number>();
  const [Batch, setBatch] = useState<string>("2024")
  const [flasher,SetFlasher] = useState<string>("");

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: (currentYear + 4) - 2020 + 1 }, (_, index) => 2020 + index);


  const [C_suggestions,setCSuggestion] = useState<{CompanyName:string}[]>([]);

  const [load,setLoad] = useState<boolean>(false);

  const [showSubmit,setShow] = useState<boolean>(true);

  const handleSave = () => {
    if( rollNo.trim()!=="" && StudentName.trim()!=="" && CompanyName.trim()!=="" && (Package) ){

      setShow(false);

      const Data = {
        rollNumber : rollNo,
        StudentName ,
        CompanyName,
        Package,
        Batch
      }
  
      console.log(Data);

      setLoad(true);
      axios.post(url+"/insert-placements",Data)
      .then((res)=>{
          console.log(res);

          setRollNo("");
          setStudentName("");
          setCompanyName("")
          setPackage(0);

          SetFlasher("Data inserted ✅");
          setTimeout(()=>{
            SetFlasher("");
          },1000)
          setLoad(false)
          setShow(true);
        })
        .catch((err)=>{
          setLoad(false )
          console.log(err);
          SetFlasher("⚠️ Failed to insert DATA");
          setTimeout(()=>{
            SetFlasher("");
          },1000)
          setShow(true);
        })
      
    }
    else{
        SetFlasher("⚠️  Please fill all the fields");
        setTimeout(()=>{
          SetFlasher("");
        },1400)
    }
  }

  
  useEffect(()=>{

    axios.post(url+"/get-companyNames",{
        Cname:CompanyName
    })
        .then((res)=>{
            console.log(res.data.data);
            setCSuggestion(res.data.data);
        })
        .catch((Err)=>{
            console.log(Err);
        })
},[CompanyName]);

  return (
    <div className='h-full min-h-screen bg-slate-500/0 flex items-center 
    justify-start flex-col w-full pt-16 px-10'>
      <div className='h-fit w-fit pt-10 px-14 flex items-center border-[#988f8f] 
          gap-5 border-[1px] rounded-xl p-4 max-sm:h-fit relative
          max-sm:mt-8 max-sm:gap-5 flex-col max-sm:items-center'>
        <div className=' flex items-center h-[160px] w-full justify-center '>
            <div className='w-[130px] h-full bg-black/50 overflow-hidden rounded-md'>
            {rollNo.length===10?  
            <img className=' w-full h-full' 
                  src={`https://iare-data.s3.ap-south-1.amazonaws.com/uploads/STUDENTS/${rollNo}/${rollNo}.jpg`}
             alt="" />:
              <div className=' text-white font-thin h-full w-full flex items-center justify-center'>
                  Photo
              </div>
            }
            </div>
        </div>
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
          <div className=' flex relative w-[250px] flex-col gap-1 '>
                <p className='block text-sm font-medium
                        leading-6 text-gray-900'> Company name</p>
                <input autoComplete='off' id="url" type="text" value={CompanyName}
                onChange={(e)=>{
                    setCompanyName(e.target.value);
                    localStorage.setItem("companyName",e.target.value);
                }}
                 className="block w-full rounded-md py-1.5
                                text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 border-black/10
                                border-[1px] tracking-widest
                                placeholder:text-gray-400 focus:ring-2 focus:ring-inset
                                px-3  focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                
                { ((C_suggestions.length > 0)) && <div className=' w-full top-16 mt-1 h-fit
                 absolute  bg-[#ffffff] rounded-md shadow-md  border-[#efede9] opacity-75 hover:opacity-100'>
                    {
                        C_suggestions.map((ele,idx)=>
                        ( ele.CompanyName!==CompanyName &&
                            <div onClick={()=>{
                                setCompanyName(ele.CompanyName);
                            }}>
                                <div className=' flex items-center justify-start transition-all hover:bg-[#eeede9] px-6 py-2'>{ele.CompanyName}</div>
                                {CompanyName.length-1 === idx &&
                                <hr className=' border-[#d4cbcb]'/>
                            }
                            </div>
                        )    
                    )
                    }
                 </div>}
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
             {years.map((year,id)=>
                        <option value={year}>{year}</option>
                    )}
          </select>
          { showSubmit && <button  onClick={()=>{
            handleSave();
          }}  
           className='transition-all active:scale-105 border-black/30 
          border-[1px] select-none px-5 py-2 rounded-xl text-lg hover:cursor-pointer
           active:shadow-lg bg-teal-700 text-white' >
              Save
          </button>}
          {load && <div>
            <span className='loader'></span>
          </div>}
        </div>
      </div>
      <div className=' h-10 mt-10 '>
        <p className=' text-orange-700'>{flasher}</p>
      </div>
    </div>
  )
}

export default UpdatePacements;
