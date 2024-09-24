import React from 'react';
import Row from './Row';

interface RowData {
    rollNo: string;
    name: string;
    companyName: string;
    package: number;  
}

interface TableProps {
    headings: string[];
    rows: RowData[];
    startSno : number;
    order:number;
    setOrder : React.Dispatch<React.SetStateAction<number>>;
}


const Table: React.FC<TableProps> = ({ headings, rows ,order, setOrder,startSno}) => {
    return (
        <div >
            <table className="styled-table  max-sm:text-xs " border={4}>
                <thead className=' border-black border-1'>
                    <tr>
                        {headings.map((head, id) => (
                            head==="Package" ?
                            <th className=' hover:cursor-pointer'  onClick={()=>{
                                if(order===0){
                                    setOrder(1);
                                }
                                if(order===1){
                                    setOrder(2);
                                }
                                if(order===2){
                                    setOrder(1);
                                }
                            }} key={id}>
                                <div className=' bg-black/0 relative'>
                                    <p>{head}</p>
                                    <div className=' bg-white/0  absolute right-0 top-0 bottom-0 flex items-center justify-center'>
                                    <svg  style={{
                                            transform: `rotate(${order === 0 ? 90 : order === 1 ? 180 : 0}deg)`,
                                            transition: 'transform 0.3s ease',
                                        }}
                                     xmlns="http://www.w3.org/2000/svg" fill='white' x="0px" y="0px" width="20" height="20" viewBox="0 0 48 48">
                                        <path d="M 7.5 7 A 1.50015 1.50015 0 1 0 7.5 10 L 26.5 10 A 1.50015 1.50015 0 1 0 26.5 7 L 7.5 7 z M 33.478516 13.5 A 1.50015 1.50015 0 0 0 32.439453 13.939453 L 25.439453 20.939453 A 1.50015 1.50015 0 1 0 27.560547 23.060547 L 32 18.621094 L 32 40.5 A 1.50015 1.50015 0 1 0 35 40.5 L 35 18.621094 L 39.439453 23.060547 A 1.50015 1.50015 0 1 0 41.560547 20.939453 L 34.560547 13.939453 A 1.50015 1.50015 0 0 0 33.478516 13.5 z M 7.5 15 A 1.50015 1.50015 0 1 0 7.5 18 L 22.5 18 A 1.50015 1.50015 0 1 0 22.5 15 L 7.5 15 z M 7.5 23 A 1.50015 1.50015 0 1 0 7.5 26 L 18.5 26 A 1.50015 1.50015 0 1 0 18.5 23 L 7.5 23 z M 7.5 31 A 1.50015 1.50015 0 1 0 7.5 34 L 14.5 34 A 1.50015 1.50015 0 1 0 14.5 31 L 7.5 31 z M 7.5 39 A 1.50015 1.50015 0 1 0 7.5 42 L 10.5 42 A 1.50015 1.50015 0 1 0 10.5 39 L 7.5 39 z"></path>
                                    </svg>

                                    </div>
                                </div>
                            </th>
                            :
                            <th key={id}>{head}</th>
                        ))}
                        {/* {headings.map((head, id) => (
                            <th key={id}>{head}</th>
                        ))} */}
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row) => (
                        <Row
                            sno={startSno + rows.indexOf(row)+1}
                            name={row.name}
                            companyName={row.companyName}
                            rollNo={row.rollNo}
                            package={row.package}
                        />
                    ))}
                </tbody>
            </table>

        </div>
    );
};

export default Table;
