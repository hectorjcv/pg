import { useRef } from "react";
import { BodyBM3 } from "./BodyBM";
import { HeaderBM3 } from "./HeaderBM";
import generatePDF, { Margin } from 'react-to-pdf';
import { HeaderTitle } from "../HeaderTitle";

export const FormatBM3 = () => {
    const tableRef = useRef(null);


    return (
        <>
        
        <div className='w-[100%] py-3 absolute left-11 top-11'>
           <button 
                className='bg-red-500 hover:bg-red-600 bg-opacity-50 hover:bg-opacity-100 rounded-md font-bold text-center py-3 px-10' 
                onClick={()=> generatePDF(tableRef, {filename: 'BM3.pdf', page:{margin:Margin.MEDIUM, orientation:"p"}})}
            >
                Export PDF (beta)
            </button>
        </div>

        <table ref={tableRef} className='w-full min-h-screen bg-white'>
            <HeaderTitle />
            <HeaderBM3 />
            <BodyBM3 />
        </table>
        </>
    );
}