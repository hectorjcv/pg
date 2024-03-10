import { Dispatch, FC, SetStateAction, useState } from "react";

import { GetUserStorage } from "../../../service/UserService";

interface Props {
    open: Dispatch<SetStateAction<boolean>>
    openData: Dispatch<SetStateAction<boolean>>
}

export const Header: FC<Props> = ({open, openData}) => {
    const user = GetUserStorage();
    const [nav, setNav] = useState(false);

    return (
        <header className='h-full'>
            <div className='w-full bg-gradient-to-r from-sky-600 to-blue-600 top-0 p-5 flex justify-between items-center'>
                <h1 className='text-center text-white font-mono text-xl font-bold'>
                    { user.role == 'ADMIN' && <span>Inventariador </span> }
                    { user.role == 'DIRECT' && <span>Director </span> }
                    { user.role == 'SECRETARY' && <span>Secretario </span> }
                    {`${user.name} ${user.lastname}`}
                </h1>
                <div className="relative max-w-sm">
                    <div className="iniline-flex bg-white border rounded-md">
                        <a href='#' onClick={()=>setNav(!nav)} className='px-4 py-2 text-sm text-gray-600 hover:text-gray-700 rounded-l-md'>+</a>
                    </div>
                    
                    <div className={`${nav ? 'bloack' : 'hidden'} absolute right-0 z-10 w-56 mt-4 origin-top-right bg-white border border-gray-100 rounded-md shadow-lg`}>
                        <span onClick={()=>open(true)} className='block px-4 py-2 text-sm text-gray-500 rounded-lg hover:bg-gray-50 hover:text-gray-700'>Cambiar contraseña</span>
                        <span onClick={()=>openData(true)} className='block px-4 py-2 text-sm text-gray-500 rounded-lg hover:bg-gray-50 hover:text-gray-700'>Actualizar datos</span>
                        <span onClick={()=>{
                            window.localStorage.removeItem('user');
                            window.localStorage.removeItem('session');
                            window.localStorage.removeItem('token');
                            window.location.reload();
                        }} className='block px-4 py-2 text-sm text-gray-500 rounded-lg hover:bg-gray-50 hover:text-gray-700'>salir</span>
                    </div>
                </div>
            </div>
        </header>
    );
}