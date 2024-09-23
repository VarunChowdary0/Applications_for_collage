import axios from 'axios';
import React, { useEffect, useState } from 'react'
import url from './URL/Constants';
import MiniWid from './MiniWid';

const StudentLocation:React.FC = () => {
    const [rollNo,setRoll] = useState<string>("");
    const [load,setLoad]=useState<boolean>(false);
    const [Data,setData] = useState<{
        Department : string,
        Semester : number,
        Section: string,
        Week_Day : string,
        Period1 : string,
        Period2 : string,
        Period3 : string,
        Period4 : string,
        Period5 : string,
        Period6 : string,
    }>({
        Department:"",
        Semester:0,
        Section: '',
        Week_Day:"",
        Period1:"",
        Period2:"",
        Period3:"",
        Period4:"",
        Period5:"",
        Period6:""
                    });

    const [display,setDisplay] = useState<boolean>(false);

    useEffect(()=>{
        if(rollNo.length===10){
            getInfo();
        }
        else{
            setDisplay(false);
        }
    },[rollNo])


    const [name,setname] = useState<string>("");


    // useEffect(()=>{
    //     console.log(Data);
    // },[Data])

    const [btn,setBtn] = useState<boolean>(true);
    
    useEffect(()=>{
        setBtn(true);
    },[rollNo]);

    const getInfo = () => {
        setLoad(true);
        setBtn(false)
        axios.post(url+"/get-class",{rollNo})
            .then((res)=>{
                // console.log(res.data.data);
                setname(res.data.data['Sname'])
                const data = res.data.data.data0[0];
                console.log(data);
                setData(data);
                setDisplay(true);
                setLoad(false);
            })
            .catch((err)=>{
                console.log(err);
                setLoad(false);
                setBtn(true);
            })
    }

   
    // -----------------------

    function getCurrentPeriod() {
        const periods = [
          { start: "09:45", end: "10:40", period: 1 },
          { start: "10:40", end: "11:35", period: 2 },
          { start: "11:35", end: "12:30", period: 3 },
          { start: "13:25", end: "14:20", period: 4 },
          { start: "14:20", end: "15:15", period: 5 },
          { start: "15:15", end: "16:10", period: 6 }
        ];
      
        const currentTime = getCurrentTime();
        // const currentTime = "10:45";
      
        for (const period of periods) {
          if (currentTime >= period.start && currentTime <= period.end) {
            return period.period;
          }
        }
      
        return 0; 
      }
      
    function getCurrentTime() {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    }


    const Mode = () =>{
        const tme = getCurrentTime();
        const srr = tme.split(":");
        if(Number(srr[0])>11){
            return "PM";
        }
        else{
            return "AM"
        }
    }

    const [period,setPeriod] = useState<number>(0);
    useEffect(()=>{
        setPeriod(getCurrentPeriod());
    },[name,Data]);
      
    
  return (
    <div className=' bg-black/0  w-full h-full z-40 flex flex-col gap-7 pt-16 items-center pb-24' >
   
    <div className=' h-fit w-[30vw] flex items-center  flex-col border-[#988f8f] 
        gap-10 border-[1px] rounded-xl p-4 max-sm:h-fit max-sm:w-[70vw] relative
        max-sm:mt-8 max-sm:gap-5 max-sm:flex-col max-sm:pb-[60px]'>
        <div className=' absolute left-4 top-2 tracking-widest flex gap-2 
         shadow-lg hover:cursor-pointer text-white px-3 py-1 bg-black rounded-md'>
            <div className=' flex items-center justify-center'> 
                {
                    Number(getCurrentTime().split(":")[0]) === 12 || Number(getCurrentTime().split(":")[0]) === 24 ?
                    <p>12</p>
                    :
                    <p>{(Number(getCurrentTime().split(":")[0]) > 12 ) ? Number(getCurrentTime().split(":")[0]) -12:Number(getCurrentTime().split(":")[0]) }</p>
                }
                <p>:</p>
                <p>{getCurrentTime().split(":")[1]}</p>
            </div>
            <p>{Mode()}</p>
        </div>
        <div className=' flex items-center h-[160px] w-full justify-center '>
            <div className='w-[130px] h-full bg-black/50 overflow-hidden rounded-md'>
                {rollNo.length===10?  
                <img className=' w-full h-full select-none' 
                    src={`https://iare-data.s3.ap-south-1.amazonaws.com/uploads/STUDENTS/${rollNo}/${rollNo}.jpg`}
                    alt="" />:
                 <div className=' text-white font-thin h-full w-full flex items-center justify-center'>Photo</div>
            }
            </div>
        </div>
            <div className=' flex mr-10 mb-1 max-sm:mr-0 max-sm:mb-0 relative w-[250px] flex-col gap-1 '>
                <p className='block text-sm font-medium
                        leading-6 text-gray-900'>Roll Number</p>
                <input autoComplete='on' id="url" type="text" value={rollNo}
                onChange={(e)=>{
                    setRoll(e.target.value.toUpperCase());
                }}
                className="block w-full rounded-md py-1.5
                                text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 border-black/10
                                border-[1px] tracking-widest
                                placeholder:text-gray-400 focus:ring-2 focus:ring-inset
                                px-3  focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                
                
            </div>
            {  (!load && btn) &&
            <div onClick={()=>{
                getInfo();
            }} className=' max-sm:bottom-2 max-sm:right-2 select-none px-5 py-2 hover:cursor-pointer bg-[#4c5cb6] 
            text-white rounded-xl active:bg-[#81ae2f] absolute bottom-5 right-8 active:shadow-lg
            transition-all active:scale-105 border-black/30 border-[1px]'>Submit</div>}
        </div>
        {display ?
        
        <div className=' w-full h-fit  bg-black/0 flex items-center justify-center mb-11'>
            <div className=' p-10 w-[500px] px-20 h-full max-sm:w-[90vw] bg-black/0 gap-3    flex flex-col
             rounded-md shadow-lg hover:shadow-2xl pt-16 transition-shadow border-[#b7b7b7] border-[1px]'>
                <div className=' flex items-center gap-14'>
                    <p className=' w-fit text-2xl'>Name</p>
                    <p className=' tracking-widest text-end max-w-[250px] max-sm:text-md text-lg font-thin'>{name}</p>
                </div>
                <hr className=' p-0 m-0' />
                <div className=' flex items-center gap-14'>
                    <p className=' w-fit text-2xl'>Branch</p>
                    <p className=' tracking-widest text-end max-w-[250px] max-sm:text-md text-lg font-thin'>{Data.Department}</p>
                </div>
                <hr className=' p-0 m-0' />
                <div className=' flex items-center gap-14'>
                    <p className=' w-fit text-2xl'>Section</p>
                    <p className=' tracking-widest text-end max-w-[250px] max-sm:text-md text-lg font-thin'>SEM-{Data.Semester} {Data.Section}</p>
                </div>
                {
                    period === 0 && <MiniWid class='No Class'/>
                }
                {
                    period === 1 && <MiniWid class={Data.Period1}/>
                }
                {
                    period === 2 && <MiniWid class={Data.Period2}/>
                }
                {
                    period === 3 && <MiniWid class={Data.Period3}/>
                }
                {
                    period === 4 && <MiniWid class={Data.Period4}/>
                }
                {
                    period === 5 && <MiniWid class={Data.Period5}/>
                }
                {
                    period === 6 && <MiniWid class={Data.Period6}/>
                }
            </div>
        </div>
        :
        <>
          {load &&  
            <div className=' h-[300px] w-full flex items-center justify-center'>
                <span className=' loader'></span>
            </div>
          }
        </>
        }

</div>
  )
}

export default StudentLocation