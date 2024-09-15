import React from 'react'
import EditIcon from './Icons/EditIcon'

interface currentProps{
    sno : number,
    rollNo : string,
    name : string,
    companyName : string,
    package :  number 
}

const Row:React.FC<currentProps> = (props) => {
  return (
    <tr className=' relative parent'>
        <td>{props.sno}</td>
        <td>
            <div className=' flex items-center justify-center gap-4'>
                <div className=' h-[50px] w-[50px] rounded-full flex items-center justify-center
                 bg-[#828282] overflow-hidden'>
                    <img className=' h-full w-full' src={`https://iare-data.s3.ap-south-1.amazonaws.com/uploads/STUDENTS/${props.rollNo}/${props.rollNo}.jpg`} alt="N" />
                </div>
                <p>{props.rollNo}</p>
            </div>
        </td>
        <td>{props.name}</td>
        <td>{props.companyName}</td>
        <td className=' px-10'>{props.package} .LPA</td>

        <div className=' child absolute right-2 h-full  flex items-center max-sm:right-[-4px] justify-center w-10'>
            <div onClick={()=>{
                window.location.href=`/EditInfo/${props.companyName}/${props.rollNo}`;
            }}  className=' hover: scale-110 active:scale-90  max-sm:scale-[0.7] 
            hover:cursor-pointer transition-all  p-2 rounded-full bg-[#ffa962]'>
                <EditIcon height={20} width={20}/>
            </div>
        </div>
    </tr>
  )
}

export default Row