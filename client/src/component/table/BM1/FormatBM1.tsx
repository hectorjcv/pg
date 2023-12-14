import { useRef } from "react";
import { BodyBM1 } from "./BodyBM1";
import { HeaderBM1 } from "./HeaderBM1";
import { useDownloadExcel } from 'react-export-table-to-excel';
import generatePDF, {Resolution, Margin} from 'react-to-pdf';

export const FormatBM1 = () => {
    const tableRef = useRef(null);

    const { onDownload } = useDownloadExcel({
        currentTableRef: tableRef.current,
        filename: 'BM1',
        sheet: 'BM1'
    });

    return (
        <>
        
        <div className='w-[100%] py-3 flex justify-center gap-x-10 absolute m-auto bottom-11 bg-purple-300'>
            <button 
                className='bg-green-500 hover:bg-green-600 rounded-md font-bold text-center py-3 px-10' 
                onClick={onDownload}
            >
                Export Excel (beta)
            </button>
            <button 
                className='bg-red-500 hover:bg-red-600 rounded-md font-bold text-center py-3 px-10' 
                onClick={()=> generatePDF(tableRef, {filename: 'BM1.pdf', page:{margin:Margin.MEDIUM, orientation:"p"}})}
            >
                Export PDF (beta)
            </button>
        </div>

        <table ref={tableRef} className='w-full min-h-screen bg-white'>
            <HeaderBM1 />
            <BodyBM1 />
        </table>
        </>
    );
}