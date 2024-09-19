import React, { useState } from 'react'

interface currentProps{
  currentPage : string
}

const Menu:React.FC<currentProps> = (prps) => {
  const [isActive,Activate] = useState<boolean>(false);
  return (

       <>
       {
        !isActive &&
        <div onClick={()=>{
          Activate(true);
        }} className=' bg-[#212645] px-4 py-2 text-white w-fit fixed top-3 left-5 
        rounded-xl hover:cursor-pointer max-sm:left-1 max-sm:scale-75'>Menu</div>
       }

       <div className={` fixed top-0  h-screen left-0 right-0  flex duration-300 transition-all z-50
         ${isActive?"translate-x-0":" translate-x-[-200vw]"}`}> 
        <div className={`  bg-[#202020] shadow-2xl   pt-24 text-xl min-w-[190px] text-center  
          gap-10 flex flex-col  h-full text-white  w-[20vw] max-sm:text-sm
          `}>
              <div className={` px-10 py-5 flex items-center justify-center 
              transition-all duration-300 ${prps.currentPage==="home"?" text-white":" text-[#8b8989]"} hover:cursor-pointer rounded-3xl`}>
                  <a href="/">Home</a>
              </div>
              <div className={` px-10 py-5 flex items-center justify-center 
              transition-all duration-300 ${prps.currentPage==="PAT_I"?" text-white":" text-[#8b8989]"} hover:cursor-pointer rounded-3xl`}>
                  <a href="/placements">Placements Information</a>
              </div>
              <div className={` px-10 py-5 flex items-center justify-center 
              transition-all duration-300 ${prps.currentPage==="UPD_PMTS"?" text-white":" text-[#8b8989]"} hover:cursor-pointer rounded-3xl`}>
                  <a href="/updatePlacements">Update Placements</a>
              </div>
              <div className={` px-10 py-5 flex items-center justify-center 
              transition-all duration-300 ${prps.currentPage==="class_info"?" text-white":" text-[#8b8989]"} hover:cursor-pointer rounded-3xl`}>
                  <a href="/studentClasses">Student class data</a>
              </div>
              
              <div className={` px-10 py-5 flex items-center justify-center 
              transition-all duration-300 ${prps.currentPage==="EDT_IFO"?" text-white":" text-[#8b8989]"} hover:cursor-pointer rounded-3xl`}>
                  <a href="/EditInfo">Edit Student Placement</a>
              </div>
              
          </div>
          <div onClick={()=>{
            Activate(false)
          }} className={` ${isActive?"bg-black/0 ":" bg-black/0"} w-[80vw] `} ></div>
       </div>
        
       </>
  )
}

export default Menu