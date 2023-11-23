import React, { Dispatch, ReactNode, SetStateAction } from "react";
import { CardSingle } from "./CardSingle";

interface Props {
    children: ReactNode,
    cb: ()=> void,
    closeModal: Dispatch<SetStateAction<boolean>>,
    w?: string
}

export const ModalBasic: React.FC<Props> = ({children, cb, closeModal, w}) => {

    const cls = w ? w : 'w-[90%]'

    return (
        <div
            className='top-0 w-screen min-h-screen left-0 bg-black bg-opacity-50 absolute flex justify-center items-center z-20'>
            
            <button 
                onClick={()=>{
                    closeModal(false);
                    cb();
                }} 
                className='top-5 right-6 font-bold text-4xl absolute text-white'
                >
                    X
            </button>
            <CardSingle w={cls}>
                {children}
            </CardSingle>
        </div>
    );
}