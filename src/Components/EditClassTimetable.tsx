import axios from 'axios';
import React, { useEffect, useState } from 'react'
import url from './URL/Constants';
import HelperRow from './HelperRow';
import { useParams } from 'react-router-dom';

const EditClassTimetable:React.FC = () => {

    const { department , semester , section } = useParams(); 

    useEffect(()=>{
        localStorage.setItem("__class_def__",JSON.stringify({
            department,
            semester,
            section
        }))
    },[])

    const [data,setData] = useState<  {
        Department: string,
        Semester: number,
        Section: string,
        Week_Day: string
        Period1: string,
        Period2: string,
        Period3: string,
        Period4: string,
        Period5: string,
        Period6: string
      }[]>();

    useEffect(()=>{
        axios.post(url+"/get-class-schedule",{
            department: department||"",
            semester: semester||null,
            section : section?.toUpperCase()||""
        })
        .then((res)=>{
            setData(res.data)
        })
        .catch((err)=>{
            console.log(err);
        })
    },[]);

    useEffect(()=>{
        if(data){
            console.log(data);
        }
    },[data]);
  return (
    <div className="h-full min-h-screen max-md:h-fit max-md:w-fit
     bg-slate-500/0 flex items-center justify-center flex-col w-full  px-10">
        <div className=' h-[100px] w-full bg-black/0 mb-5'>
            <p className=' w-full text-center text-3xl font-bold'>{department}</p>
            <div className=' w-full h-fit flex items-center gap-5 mt-3 text-xl
             font-semibold justify-center'>
                <p>Semester - {semester}</p>
                <p>Section - {section}</p>
            </div>
        </div>
       { data ? <table className='border border-black' cellSpacing={0} >
            <tr className=" bg-[#e5b8b9ea]">
                <th className='border border-black'>DAY</th>
                <th className="heading1 p-[10px]">
                    <p>9:45 AM</p>
                    <p>to</p>
                    <p>10:40 AM</p>
                </th>
                <th className="heading1 border border-black p-[10px]">
                    <p>10:40 AM</p>
                    <p>to</p>
                    <p>11:35 AM</p>
                </th>
                <th className="heading1border border-black p-[10px]">
                    <p>11:35 AM</p>
                    <p>to</p>
                    <p>12:30 PM</p>
                </th>
                <th className='border border-black' rowSpan={7}>
                    <div  className=" flex px-4   flex-col gap-[20px]">
                        <p>L</p>
                        <p>U</p>
                        <p>N</p>
                        <p>C</p>
                        <p>H</p>
                    </div>
                </th>
                <th className="heading1 border border-black p-[10px]">
                    <p>1:25 PM</p>
                    <p>to</p>
                    <p>2:20 PM</p>
                </th>
                <th className="heading1 border border-black p-[10px]">
                    <p>2:20 PM</p>
                    <p>to</p>
                    <p>3:15 PM</p>
                </th>
                <th className="heading1 border border-black p-[10px]">
                    <p>3:15 PM</p>
                    <p>to</p>
                    <p>4:10 PM</p>
                </th>
            </tr>
            {data && data.map((ele, idx) => (
            <tr key={idx} className=' relative'>
                <td className='border border-black text-center py-[5px]'>
                    <b>{ele.Week_Day}</b>
                </td>
                <HelperRow 
                dept={ele.Department}
                sem={ele.Semester}
                section={ele.Section}
                day={ele.Week_Day}
                arry={[ele.Period1, ele.Period2, ele.Period3, ele.Period4, ele.Period5, ele.Period6]} />
            </tr>
            ))}
        </table> :
        <div className='loader'></div>
        }
    </div>
)
}

export default EditClassTimetable