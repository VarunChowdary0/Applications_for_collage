import axios from 'axios';
import React, { useState } from 'react'
import url from './URL/Constants';

const StudentLocation:React.FC = () => {
    const [rollNo,setRoll] = useState<string>("");


    const getInfo = () => {
        axios.post(url+"/get-class",rollNo)
            .then((res)=>{
                console.log(res.data);
            })
            .catch((err)=>{
                console.log(err);
            })
    }
  return (
    <div className=' bg-black/0  w-full h-full z-40 flex flex-col gap-7 pt-16 items-center pb-24' >
   
    <div className=' h-fit w-[30vw] flex items-center  flex-col border-[#988f8f] 
        gap-10 border-[1px] rounded-xl p-4 max-sm:h-fit max-sm:w-[70vw] relative
        max-sm:mt-8 max-sm:gap-5 max-sm:flex-col max-sm:pb-[60px]'>
        <div className=' flex items-center h-[160px] w-full justify-center '>
            <div className='w-[130px] h-full bg-black/50 overflow-hidden rounded-md'>
                {rollNo.length===10?  
                <img className=' w-full h-full' 
                    src={`https://iare-data.s3.ap-south-1.amazonaws.com/uploads/STUDENTS/${rollNo}/${rollNo}.jpg`}
                    alt="" />:
                 <div className=' text-white font-thin h-full w-full flex items-center justify-center'>Photo</div>
            }
            </div>
        </div>
            <div className=' flex mr-10 mb-1 max-sm:mr-0 max-sm:mb-0 relative w-[250px] flex-col gap-1 '>
                <p className='block text-sm font-medium
                        leading-6 text-gray-900'>Roll Number</p>
                <input autoComplete='off' id="url" type="text" value={rollNo}
                onChange={(e)=>{
                    setRoll(e.target.value.toUpperCase());
                }}
                className="block w-full rounded-md py-1.5
                                text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 border-black/10
                                border-[1px] tracking-widest
                                placeholder:text-gray-400 focus:ring-2 focus:ring-inset
                                px-3  focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                
                
            </div>
            {  
            <div onClick={()=>{
                // setSubmmit(true);
            }} className=' max-sm:bottom-2 max-sm:right-2 select-none px-5 py-2 hover:cursor-pointer bg-[#4c5cb6] 
            text-white rounded-xl active:bg-[#81ae2f] absolute bottom-5 right-8 active:shadow-lg
            transition-all active:scale-105 border-black/30 border-[1px]'>Submit</div>}
        </div>
        <div className=' w-full h-fit  bg-black/0 flex items-center justify-center mb-11'>
            <div className=' p-10 w-[500px] px-20 h-full max-sm:w-[90vw] bg-black/0 gap-3    flex flex-col
             rounded-md shadow-lg hover:shadow-2xl pt-16 transition-shadow border-[#b7b7b7] border-[1px]'>
                <div className=' flex items-center gap-14'>
                    <p className=' w-fit text-2xl'>Name</p>
                    <p className=' tracking-widest text-end max-w-[250px] max-sm:text-md text-lg font-thin'>Sai Vamsi</p>
                </div>
                <hr className=' p-0 m-0' />
                <div className=' flex items-center gap-14'>
                    <p className=' w-fit text-2xl'>Branch</p>
                    <p className=' tracking-widest text-end max-w-[250px] max-sm:text-md text-lg font-thin'>Computer Science and Engineering</p>
                </div>
                <hr className=' p-0 m-0' />
                <div className=' flex items-center gap-14'>
                    <p className=' w-fit text-2xl'>Section</p>
                    <p className=' tracking-widest text-end max-w-[250px] max-sm:text-md text-lg font-thin'>SEM-V B</p>
                </div>
                <hr className=' p-0 m-0' />
                <div className=' flex items-center gap-14'>
                    <p className=' w-fit text-2xl'>Current Class</p>
                    <p className=' tracking-widest text-end max-w-[250px] max-sm:text-md text-lg font-thin'>WAD LAB</p>
                </div>
                <hr className=' p-0 m-0' />
                <div className=' flex items-center gap-14'>
                    <p className=' w-fit text-2xl'>Class Number</p>
                    <p className=' tracking-widest text-end max-w-[250px] max-sm:text-md text-lg font-thin'>1104</p>
                </div>
                <hr className=' p-0 m-0' />
                <div className=' flex items-center gap-14'>
                    <p className=' w-fit text-2xl'>Faculty</p>
                    <p className=' tracking-widest text-end max-w-[250px] max-sm:text-md text-lg font-thin'>faculty name</p>
                </div>
                <hr className=' p-0 m-0' />
            </div>
        </div>
</div>
  )
}

export default StudentLocation