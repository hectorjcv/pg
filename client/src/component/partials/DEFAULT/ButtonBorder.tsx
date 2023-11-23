import React, { ReactNode } from "react";

interface Props {
    children: ReactNode,
    cb: ()=>void
}

export const ButtonBorder: React.FC<Props> = ({children, cb}) => {

    return (
        <button
            onClick={()=>{ cb() }}
            className='px-8 w-auto mx-auto font-bold rounded-lg py-3 border border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white'>
            {children}
        </button>
    );
}

interface PropsButton {
    color: 'red' | 'green' | 'purple' | 'blue',
    text: string
    cb?: (id:number)=>void,
    id?: number
}

export const ButtonCB: React.FC<PropsButton> = ({color, text, cb, id}) => {

    let colorBG:string = 'bg-purple-500 hover:bg-purple-600'

    if (color === 'red') colorBG = 'bg-red-500 hover:bg-red-600'
    if (color === 'green') colorBG = 'bg-green-500 hover:bg-green-600'
    if (color === 'blue') colorBG = 'bg-blue-500 hover:bg-blue-600'
    if (color === 'purple') colorBG = 'bg-purple-500 hover:bg-purple-600'


    return (
        <button
            onClick={()=>{ if(cb && id) cb(id) }}
            className={`${colorBG} px-7 py-3 font-bold text-center rounded-md`}
            >
                {text}
        </button>
    );
}
