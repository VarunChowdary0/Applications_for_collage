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

    const pageLen = 10;
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

    const [showingData,setShowing] = useState<PlacementData[]>([]);
    const [ShowingIdx,setShowingIdx] = useState<number[]>([0,pageLen]);

    const [data_accending,setAccending] = useState<PlacementData[]>([]);
    const [data_Decending,setDecending] = useState<PlacementData[]>([]);

    const [companyName,setCompanyName] = useState<string>(localStorage.getItem("companyName")||"");

    const [Batch,setBatch] = useState<string>("2024");

    const [isFetched,setFetchStat] = useState<boolean>(false);
    const [isSubimmted,setSubmmit] = useState<boolean>(false);


    const [C_suggestions,setCSuggestion] = useState<{CompanyName:string}[]>([]);

    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: (currentYear + 4) - 2020 + 1 }, (_, index) => 2020 + index);

    const [load,setLoad] = useState<boolean>(false);

    const callFetch = () => {
        setData([]);
        setLoad(true);
        axios.post(url + "/get-placement-info", {
            companyName,
            Batch
        })
        .then((res) => {
            const placements: PlacementData[] = res.data.data;
            // console.log(placements);
            setLoad(false);
            setData(placements);
            setFetchStat(true);
            if(placements.length>20){ 
                setShowingIdx([0,pageLen]);
            }
            else{
                setShowingIdx([0,placements.length]);
            }
        })
        .catch((err) => {
            console.log(err);
            setSubmmit(false);
        });
    };

    const sortByPackageAccending = () => {
        const sortedData = [...data].sort((a, b) => a.package - b.package);
        setAccending(sortedData);
      };

    const sortByPackageDecending = () => {
        const sortedData = [...data].sort((a, b) => b.package - a.package);
        setDecending(sortedData);
    };


    const [order,setOrder] = useState<number>(0);

    useEffect(()=>{
        if(order===1){
            setData(data_accending);
        }
        if(order===2){
            setData(data_Decending);
        }
    },[order])

    
    useEffect(()=>{
        if(companyName.length !== 0){
            callFetch();
        } 
    },[,companyName,Batch])
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
    },[companyName,Batch]);


    useEffect(()=>{
        sortByPackageAccending();
        sortByPackageDecending();
        // console.log(data.length)
        if(data.length<ShowingIdx[1]){
            setShowing(data.slice(ShowingIdx[0], data.length));
        }
        else {
            setShowing(data.slice(ShowingIdx[0], ShowingIdx[1]));
          }
    },[data,ShowingIdx]);

    const NextPage = () => {
        const x = ShowingIdx[0];
        const y = ShowingIdx[1];
        // console.log(data.length > y)
        if(data.length > y){
            if(data.length>y+pageLen){
                setShowingIdx([y,y+pageLen]);
            }
            else{
                setShowingIdx([y,data.length]);
            }
        } 
    }
    const PreviousPage = () => {
        const x = ShowingIdx[0];
        const y = ShowingIdx[1];
        // console.log(x)
        if(x>1){
            if(x-pageLen>0){
                setShowingIdx([x-pageLen,y-pageLen]);
            }
            if(y===data.length){
                const c = data.length%pageLen;
                setShowingIdx([x-pageLen,y-c]);
            }
            else{
                setShowingIdx([0,pageLen]);
            }
        }
    }

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
                
                { ((C_suggestions.length > 0)) && <div className=' w-full top-16 mt-1 h-fit
                 absolute  bg-[#ffffff] rounded-md shadow-md  border-[#efede9] z-40'>
                    {
                        C_suggestions.map((ele,idx)=>
                        ( ele.CompanyName!==companyName &&
                            <div onClick={()=>{
                                setCompanyName(ele.CompanyName);
                            }}>
                                <div className=' hover:cursor-pointer flex items-center justify-start transition-all hover:bg-[#eeede9] px-6 py-2'>{ele.CompanyName}</div>
                                {companyName.length-1 === idx &&
                                <hr className=' border-[#d4cbcb]'/>
                            }
                            </div>
                        )    
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
                    {years.map((year,id)=>
                        <option value={year}>{year}</option>
                    )} 
                </select>
            </div>
            { (!isSubimmted && companyName.trim().length>0 ) && 
            <div onClick={()=>{
                callFetch();
                setSubmmit(true);
            }} className=' select-none px-5 py-2 hover:cursor-pointer bg-[#4c5cb6] 
            text-white rounded-xl active:bg-[#81ae2f] absolute bottom-5 right-8 active:shadow-lg
             transition-all active:scale-105 border-black/30 border-[1px] max-sm:bottom-3 max-sm:right-2'>Submit</div>}
        </div>
        <div className=' h-[50px] w-full'>
            { ( isSubimmted && companyName.trim().length>0 ) &&
                <div className=' w-full h-full flex items-center justify-center
                text-center bg-slate-600/0 font-thin tracking-wider '>
                    {
                        isFetched?
                        <p>
                            {data.length>0?
                            `No Data Found.`:`Showing Results on Placements at ${companyName} for batch ${Batch}`}
                        </p> 
                        :
                        <p>Looking for Results on Placements at {companyName} for batch {Batch} ...</p>
                    }
                </div>
            }
        </div>
       
       {load &&
        <div className=' w-full h-20 bg-black/0 flex items-center justify-center mt-[100px]'>
            <span className='loader'></span>
        </div>
       }

        {data.length>0 &&
            <div className='w-full h-fit bg-slate-600/0  flex justify-center  px-4 flex-col '>
                <div className=' h-10 w-full bg-black/0 flex ic justify-center'>
                    <div className=' h-full w-[70%] bg-black/0 flex justify-end items-end max-sm:w-full '>
                        <div className=' px-4 h-fit w-fit py-2 hover:cursor-pointer max-sm:scale-75
                         flex items-center justify-center gap-3 text-white rounded-lg select-none bg-black/70'>
                            <div onClick={()=>{
                                PreviousPage();
                            }} className=' rotate-0 hover:scale-110 transition-all active:scale-90'>
                                <svg xmlns="http://www.w3.org/2000/svg" 
                                        fill="white" height="30px" width="30px" version="1.1" id="Layer_1" viewBox="0 0 330 330">
                                        <path id="XMLID_6_" 
                                        d="M165,0C74.019,0,0,74.019,0,165s74.019,165,165,165s165-74.019,165-165S255.981,0,165,0z M205.606,234.394  c5.858,5.857,5.858,15.355,0,21.213C202.678,258.535,198.839,260,195,260s-7.678-1.464-10.606-4.394l-80-79.998  c-2.813-2.813-4.394-6.628-4.394-10.606c0-3.978,1.58-7.794,4.394-10.607l80-80.002c5.857-5.858,15.355-5.858,21.213,0  c5.858,5.857,5.858,15.355,0,21.213l-69.393,69.396L205.606,234.394z"/>
                                    </svg>
                                </div>
                            <p>{`${ShowingIdx[0]+1} to ${ShowingIdx[1]}`}</p>
                            <div onClick={()=>{
                                NextPage();
                            }} className=' rotate-180 hover:scale-110 transition-all active:scale-90'>
                                <svg xmlns="http://www.w3.org/2000/svg" 
                                    fill="white" height="30px" width="30px" version="1.1" id="Layer_1" viewBox="0 0 330 330">
                                    <path id="XMLID_6_" 
                                    d="M165,0C74.019,0,0,74.019,0,165s74.019,165,165,165s165-74.019,165-165S255.981,0,165,0z M205.606,234.394  c5.858,5.857,5.858,15.355,0,21.213C202.678,258.535,198.839,260,195,260s-7.678-1.464-10.606-4.394l-80-79.998  c-2.813-2.813-4.394-6.628-4.394-10.606c0-3.978,1.58-7.794,4.394-10.607l80-80.002c5.857-5.858,15.355-5.858,21.213,0  c5.858,5.857,5.858,15.355,0,21.213l-69.393,69.396L205.606,234.394z"/>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='w-full overflow-x-auto flex items-center justify-center max-sm:pl-16 z-30'>
                    <Table 
                    startSno={ShowingIdx[0]}
                    order={order} 
                    setOrder={setOrder} 
                    headings={["SNO", "Roll number", "Name", "Company", "Package"]} 
                    rows={showingData} />
                </div>
            </div>
        }
    </div>
  )
}

export default Placement_Info