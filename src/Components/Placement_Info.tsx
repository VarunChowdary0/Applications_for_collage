import React, { useEffect, useState } from 'react'
import Table from './Table';
import axios from 'axios';
import url from './URL/Constants';


interface PlacementData {
    rollNo: string;
    name: string;
    companyName: string;
    package: number;
  }

const Placement_Info:React.FC = () => {
    const [data, setData] = useState<PlacementData[]>([
            // { rollNo: "20951A6609", name: "V D P GANESH", companyName: "TCS", package: 9.0 },
            // { rollNo: "20951A0463", name: "SURROLA HEMANTH", companyName: "TCS", package: 9.0 },
            // { rollNo: "20951A0555", name: "G HRUTHI VADAN", companyName: "TCS", package: 7.0 },
            // { rollNo: "20951A0585", name: "M MANOJ", companyName: "TCS", package: 7.0 },
            // { rollNo: "20951A05G4", name: "PASUPULA SATWIK", companyName: "TCS", package: 7.0 },
            // { rollNo: "20951A05K8", name: "LANKA SRI VISHAL", companyName: "TCS", package: 7.0 },
            // { rollNo: "20951A6616", name: "P L SAI CHARAN", companyName: "TCS", package: 7.0 },
            // { rollNo: "20951A6634", name: "BHALKE PREMNATH", companyName: "TCS", package: 7.0 },
            // { rollNo: "20951A6702", name: "BODAKUNTA AJAY", companyName: "TCS", package: 7.0 },
            // { rollNo: "20951A6723", name: "M MEENAKSHI", companyName: "TCS", package: 7.0 },
            // { rollNo: "20951A6718", name: "CHEEKATI KARTHIK", companyName: "TCS", package: 7.0 },
            // { rollNo: "21955A1208", name: "PABBU ROHITH", companyName: "TCS", package: 7.0 },
            // { rollNo: "20951A1288", name: "SANTOSH ARYAL", companyName: "TCS", package: 7.0 },
            // { rollNo: "20951A1293", name: "S MD SHARFUDDIN", companyName: "TCS", package: 7.0 },
            // { rollNo: "20951A1222", name: "P GANGA REDDY", companyName: "TCS", package: 7.0 },
            // { rollNo: "20951A3303", name: "M AISHWARYA", companyName: "TCS", package: 7.0 },
            // { rollNo: "20951A04H3", name: "GURRAM SHARANYA", companyName: "TCS", package: 7.0 },
            // { rollNo: "20951A0439", name: "A DEEPAK KUMAR", companyName: "TCS", package: 7.0 },
            // { rollNo: "20951A04F5", name: "M SAI NIKETH", companyName: "TCS", package: 7.0 },
            // { rollNo: "21955A0417", name: "A S SHASHIDHAR", companyName: "TCS", package: 7.0 },
            // { rollNo: "20951A04F2", name: "A SAI KOUSHIK", companyName: "TCS", package: 7.0 },
            // { rollNo: "20951A0475", name: "KUSUMA SAITEJA", companyName: "TCS", package: 7.0 },
            // { rollNo: "20951A1260", name: "S J PRANEETH", companyName: "TCS", package: 7.0 },
            // { rollNo: "20951A0589", name: "S M DHARMA TEJA", companyName: "TCS", package: 3.36 },
            // { rollNo: "20951A6648", name: "G SRIKAR", companyName: "TCS", package: 3.36 }
        ]);

    const [companyName,setCompanyName] = useState<string>(localStorage.getItem("companyName")||"");

    const [Batch,setBatch] = useState<string>("2024");

    const [isFetched,setFetchStat] = useState<boolean>(false);
    const [isSubimmted,setSubmmit] = useState<boolean>(false);


    const [C_suggestions,setCSuggestion] = useState<{CompanyName:string}[]>([]);



    const callFetch = () => {
        axios.post(url + "/get-placement-info", {
            companyName,
            Batch
        })
        .then((res) => {
            const placements: PlacementData[] = res.data.data;
            console.log(placements);    
            setData(placements);

        })
        .catch((err) => {
            console.log(err);
            setSubmmit(false);
        });
    };

    
    useEffect(()=>{
        if(companyName.length !== 0){
            callFetch();
        } 
    },[,companyName])
    useEffect(()=>{

        axios.post(url+"/get-companyNames",{
            Cname:companyName
        })
            .then((res)=>{
                console.log(res.data.data);
                setCSuggestion(res.data.data);
            })
            .catch((Err)=>{
                console.log(Err);
            })


        setSubmmit(false);
    },[companyName]);

  return (
    <div className=' bg-black/0  w-full h-full z-40 flex flex-col gap-7 pt-16 items-center pb-24' >
        <div className=' h-[100px] w-[60vw] flex items-center   border-[#988f8f] 
        gap-10 border-[1px] rounded-xl p-4 max-sm:h-fit max-sm:w-[70vw] relative
        max-sm:mt-8 max-sm:gap-5 max-sm:flex-col'>
            <div className=' flex relative w-[250px] flex-col gap-1 '>
                <p className='block text-sm font-medium
                        leading-6 text-gray-900'> Company name</p>
                <input autoComplete='off' id="url" type="text" value={companyName}
                onChange={(e)=>{
                    setCompanyName(e.target.value);
                    localStorage.setItem("companyName",e.target.value);
                }}
                 className="block w-full rounded-md py-1.5
                                text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 border-black/10
                                border-[1px] tracking-widest
                                placeholder:text-gray-400 focus:ring-2 focus:ring-inset
                                px-3  focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                
                {C_suggestions.length > 0 && <div className=' w-full top-16 mt-1 h-fit
                 absolute  bg-[#ffffff] rounded-md shadow-md border-2 border-[#efede9]'>
                    {
                        C_suggestions.map((ele,idx)=>
                            <div onClick={()=>{
                                setCompanyName(ele.CompanyName);
                            }}>
                                <div className=' flex items-center justify-start transition-all hover:bg-[#eeede9] px-6 py-2'>{ele.CompanyName}</div>
                                <hr className=' border-[#d4cbcb]'/>
                            </div>
                        )
                    }
                 </div>}
            </div>
            <div className='  flex w-[250px] flex-col gap-1 '>
                <p className='block text-sm font-medium
                        leading-6 text-gray-900'> Batch  </p>
                <select className=' w-[150px]   py-2 rounded-md border-black/10
                                border-[1px] tracking-widest shadow-sm ring-1 ring-inset ring-gray-300 
                                placeholder:text-gray-400 focus:ring-2 focus:ring-inset
                                px-3  focus:ring-indigo-600 sm:text-sm sm:leading-6'
                                onChange={(e)=>{
                                    setBatch(e.target.value);
                                }}
                                value={Batch} > 
                    <option value="2020">2020</option>
                    <option value="2021">2021</option>
                    <option value="2022">2022</option>
                    <option value="2023">2023</option>
                    <option value="2024">2024</option>
                </select>
            </div>
            { (!isSubimmted && companyName.trim().length>0 ) && 
            <div onClick={()=>{
                callFetch();
                setSubmmit(true);
            }} className=' select-none px-5 py-2 hover:cursor-pointer bg-[#4c5cb6] 
            text-white rounded-xl active:bg-[#81ae2f] absolute bottom-5 right-8 active:shadow-lg
             transition-all active:scale-105 border-black/30 border-[1px]'>Submit</div>}
        </div>
        <div className=' h-[50px] w-full'>
            { ( isSubimmted && companyName.trim().length>0 ) &&
                <div className=' w-full h-full flex items-center justify-center
                text-center bg-slate-600/0 font-thin tracking-wider '>
                    {
                        isFetched?
                        <p>Showing Results on Placements at {companyName} for batch {Batch} </p> 
                        :
                        <p>Looking for Results on Placements at {companyName} for batch {Batch} ...</p>
                    }
                </div>
            }
        </div>
       

        <div className='w-full h-fit bg-slate-600/0  flex justify-center mb-12 px-4'>
            <div className='w-full overflow-x-auto flex items-center justify-center'>
                <Table headings={["SNO", "Roll number", "Name", "Company", "Package"]} rows={data} />
            </div>
        </div>

    </div>
  )
}

export default Placement_Info