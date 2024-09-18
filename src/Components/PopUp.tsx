import React, { useState } from 'react'
import XmarkIcon from './Icons/XmarkIcon'

interface currentPops{
    setShow : React.Dispatch<React.SetStateAction<boolean>>;
    message:string;
    callFunction : () => void;
    load:boolean
}

const PopUp:React.FC<currentPops> = (props) => {



  return (
    <div className=' z-40 fixed top-0 bottom-0 left-0 right-0 bg-[#674141]/30
    backdrop-blur-md flex pt-[200px] justify-center'>
        <div className=' min-h-[25vh] w-fit h-fit rounded-xl shadow-2xl overflow-hidden
         min-w-[30vw] bg-[#313131] relative max-sm:w-[90vw]'>
            <div className=' w-full h-10 bg-[#fffffffe] flex justify-end items-end'>
                <div onClick={()=>{
                    props.setShow(false);
                }} className=' h-full w-[60px] hover:bg-[#d53230] 
                flex items-center justify-center hoevr:cursor-pointer'>
                    <XmarkIcon height={20} width={20} color='#1f1f1f'/>
                </div>
            </div>
            <div className=' bg-black/0 h-full w-full text-white p-10 '>
                <div className=' bg-black/0 text-center text-lg'>
                    {props.message}
                </div>    
            </div> 
            {props.load?
                <div className=' w-full flex justify-center items-center'>
                    <span className='loader scale-75'></span>    
                </div> 
                :
                <div onClick={props.callFunction} className=' items-center left-0 right-0 justify-center flex h-10 absolute bottom-3'>
                    <div className=' text-emerald-50 rounded-md hover:cursor-pointer px-4 py-2 
                    active:scale-75 select-none bg-red-700 transition-all'>
                        Delete
                    </div>
                </div>
        }
        </div>
    </div>
  )
}

export default PopUp