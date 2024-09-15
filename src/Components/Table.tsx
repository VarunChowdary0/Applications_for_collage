import React from 'react';
import Row from './Row';

interface RowData {
    rollNo: string;
    name: string;
    companyName: string;
    package: number;  // Renamed from `package` to `packageAmount`
}

interface TableProps {
    headings: string[];
    rows: RowData[];
}

const Table: React.FC<TableProps> = ({ headings, rows }) => {
    return (
        <div >
            <table className="styled-table  max-sm:text-xs " border={4}>
                <thead className=' border-black border-1'>
                    <tr>
                        {headings.map((head, id) => (
                            <th key={id}>{head}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row) => (
                        <Row
                            sno={rows.indexOf(row)+1}
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
