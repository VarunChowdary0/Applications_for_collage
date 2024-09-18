import React from 'react'
import XmarkIcon from './Icons/XmarkIcon'

const PopUp:React.FC = () => {
  return (
    <div className=' z-40 fixed top-0 bottom-0 left-0 right-0 bg-black/40 
    backdrop-blur-lg flex pt-[200px] justify-center'>
        <div className=' h-[40vh] rounded-xl shadow-2xl overflow-hidden
         w-[40vw] bg-[#313131]'>
            <div className=' w-full h-10 bg-[#ddd] flex justify-end items-end'>
                <div className=' h-full w-[60px] hover:bg-[#d53230] 
                flex items-center justify-center hoevr:cursor-pointer'>
                    <XmarkIcon height={20} width={20} color='white'/>
                </div>
            </div>
            <div className=' bg-black/0 h-full w-full'>

                </div> 
        </div>
    </div>
  )
}

export default PopUp