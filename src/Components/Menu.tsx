import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface currentProps {
  currentPage: string;
}

const Menu: React.FC<currentProps> = (prps) => {
  const [isActive, Activate] = useState<boolean>(false);
  
  const xpop: {
    department: string;
    section: string;
    semester: number;
  } = localStorage.getItem("__class_def__") 
      ? JSON.parse(localStorage.getItem("__class_def__")!) 
      : {
          department: "Computer Science and Engineering",
          semester: 5,
          section: 'A'
      };
  
  return (
    <>
      {!isActive && (
        <div
          onClick={() => {
            Activate(true);
          }}
          className=' bg-[#212645] px-4 py-2 text-white w-fit fixed top-3 left-5 
          rounded-xl hover:cursor-pointer max-sm:left-1 max-sm:scale-75'
        >
          Menu
        </div>
      )}

      <div
        className={`fixed top-0 h-screen left-0 right-0 flex duration-300 transition-all z-50
         ${isActive ? 'translate-x-0' : ' translate-x-[-200vw]'}`}
      >
        <div
          className={`bg-[#202020] shadow-2xl pt-24 text-xl min-w-[190px] text-center  
          gap-10 flex flex-col h-full text-white w-[20vw] max-sm:text-sm`}
        >
          <div
            className={`px-10 py-5 flex items-center justify-center 
              transition-all duration-300 ${
                prps.currentPage === 'home' ? 'text-white' : 'text-[#8b8989]'
              } hover:cursor-pointer rounded-3xl`}
          >
            <Link to="/">Home</Link>
          </div>
          <div
            className={`px-10 py-5 flex items-center justify-center 
              transition-all duration-300 ${
                prps.currentPage === 'PAT_I' ? 'text-white' : 'text-[#8b8989]'
              } hover:cursor-pointer rounded-3xl`}
          >
            <Link to="/placements">Placements Information</Link>
          </div>
          <div
            className={`px-10 py-5 flex items-center justify-center 
              transition-all duration-300 ${
                prps.currentPage === 'UPD_PMTS' ? 'text-white' : 'text-[#8b8989]'
              } hover:cursor-pointer rounded-3xl`}
          >
            <Link to="/updatePlacements">Update Placements</Link>
          </div>
          <div
            className={`px-10 py-5 flex items-center justify-center 
              transition-all duration-300 ${
                prps.currentPage === 'class_info' ? 'text-white' : 'text-[#8b8989]'
              } hover:cursor-pointer rounded-3xl`}
          >
            <Link to="/studentClasses">Student Class Data</Link>
          </div>
          <div
            className={`px-10 py-5 flex items-center justify-center 
              transition-all duration-300 ${
                prps.currentPage === 'EDT_IFO' ? 'text-white' : 'text-[#8b8989]'
              } hover:cursor-pointer rounded-3xl`}
          >
            <Link to="/EditInfo">Edit Student Placement</Link>
          </div>
          <div
            className={`px-10 py-5 flex items-center justify-center 
              transition-all duration-300 ${
                prps.currentPage === 'EDT_CTT' ? 'text-white' : 'text-[#8b8989]'
              } hover:cursor-pointer rounded-3xl`}
          >
            <Link to={`/EditTimeTable/${xpop.department}/${xpop.semester}/${xpop.section}`}>Edit Class Time Table</Link>
          </div>
        </div>

        <button
          onClick={() => {
            Activate(false);
          }}
          className={` ${isActive ? 'bg-black/0 ' : 'bg-black/0'} w-[80vw] `}
        ></button>
      </div>
    </>
  );
};

export default Menu;
