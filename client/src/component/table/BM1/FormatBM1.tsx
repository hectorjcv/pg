import { useRef } from "react";
import { BodyBM1 } from "./BodyBM1";
import { HeaderBM1 } from "./HeaderBM1";
import generatePDF, { Margin } from 'react-to-pdf';
import { HeaderTitle } from "../HeaderTitle";

export const FormatBM1 = () => {
    const tableRef = useRef(null);

    return (
        <>
        <div className='w-[100%] py-3 absolute top-10 left-10'>
            <button 
                className='bg-red-500 hover:bg-red-600 bg-opacity-50 hover:bg-opacity-100 rounded-md font-bold text-center py-3 px-10' 
                onClick={()=> generatePDF(tableRef, {filename: 'BM1.pdf', page:{margin:Margin.MEDIUM, orientation:"l"}})}
            >
                Export PDF (beta)
            </button>
        </div>

        <table ref={tableRef} className='w-full min-h-screen bg-white'>
            <HeaderTitle />
            <HeaderBM1 />
            <BodyBM1 />
        </table>
        </>
    );
}