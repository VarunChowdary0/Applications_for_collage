import axios from 'axios';
import React, { useEffect, useState } from 'react';
import url from './URL/Constants';

interface currentProps {
    arry: string[];
    dept: string;
    sem: number;
    section: string;
    day: string;
}

const HelperRow: React.FC<currentProps> = (ele) => {
    const [values, setValues] = useState<string[]>(ele.arry);
    
    const [isChanged, setChanged] = useState<boolean>(false);

    const handleInputChange = (idx: number, part: number, newValue: string) => {
        const updatedValues = [...values];
        const splitValue = updatedValues[idx].split('|');
        splitValue[part] = newValue;
        updatedValues[idx] = splitValue.join('|');
        setValues(updatedValues);
    };

    useEffect(()=>{
        // console.log(values);
        if(ele.arry !== values){
            setChanged(true);
        }
    },[values]);

    return (
        <>
                <>
                    {values.map((elem, idx) => {
                        const [course, faculty, room] = elem.split('|');
                        return (
                            <td key={idx} className='border border-black text-center py-[5px]'>
                                <input
                                    className='px-2 text-center'
                                    type='text'
                                    value={course}
                                    onChange={(e) => {
                                        handleInputChange(idx, 0, e.target.value);
                                        console.log("Day :" + ele.day + "\nPeriod = " + (idx + 1));
                                    }}
                                />
                                <input
                                    className='px-2 text-center'
                                    type='text'
                                    value={faculty}
                                    onChange={(e) => {
                                        handleInputChange(idx, 1, e.target.value);
                                        console.log("Day :" + ele.day + "\nPeriod = " + (idx + 1));
                                    }}
                                />
                                <input
                                    className='px-2 text-center'
                                    type='text'
                                    value={room}
                                    onChange={(e) => {
                                        handleInputChange(idx, 2, e.target.value);
                                        console.log("Day :" + ele.day + "\nPeriod = " + (idx + 1));
                                    }}
                                />
                            </td>
                        );
                    })}
                    { isChanged && <div
                        onClick={()=>{
                            const data = {
                                department : ele.dept,
                                semester : ele.sem,
                                section : ele.section,
                                day : ele.day,
                                period1 : values[0],
                                period2 : values[1],
                                period3 : values[2],
                                period4 : values[3],
                                period5 : values[4],
                                period6 : values[5],
                            };

                            console.log(data);

                            axios.post(url+"/update-time-table",data)
                                .then((res)=>{
                                    console.log(data);
                                    // window.location.reload();
                                    setChanged(false);
                                })
                                .catch((err)=>{
                                    console.log(err);
                                })
                        }}
                    className=' hover:cursor-pointer absolute px-1 pb-2 top-2
                     right-2 bg-green-300 rounded-xl'>
                        &#10004;
                    </div> }
                </>
        </>
    );
};

export default HelperRow;
