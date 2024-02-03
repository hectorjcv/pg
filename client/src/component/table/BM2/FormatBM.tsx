import { useRef } from "react";
import { BodyBM2 } from "./BodyBM";
import { HeaderBM2 } from "./HeaderBM";
import generatePDF, { Margin } from 'react-to-pdf';

export const FormatBM2 = () => {
    const tableRef = useRef(null);

    return (
        <>
            <div className='w-[100%] py-3 flex justify-center gap-x-10 absolute m-auto bottom-11 bg-purple-300'>
                <button 
                    className='bg-red-500 hover:bg-red-600 rounded-md font-bold text-center py-3 px-10' 
                    onClick={()=> {
                        generatePDF(
                            tableRef, 
                            {
                                filename: 'BM2.pdf', 
                                page: {
                                    margin:Margin.MEDIUM,
                                    orientation:"landscape"
                                }
                            }
                        )}
                    }
                >
                    Export PDF (beta)
                </button>
            </div>

            <table ref={tableRef} className='w-full min-h-screen bg-white'>
                <HeaderBM2 />
                <BodyBM2 />
            </table>
        </>
    );
}