import { Dispatch, FC, SetStateAction, useState } from "react";
import { BASIC_URL } from "../../../constants";
import { useAuth } from "../../../context/AuthContext";
import { DeleteStorage } from "../../../service/DeleteStorage";
import { GetUserStorage } from "../../../service/UserService";
import { Navigate } from "../../../hooks/useNavigate";

interface Props {
    open: Dispatch<SetStateAction<boolean>>
}

export const Header: FC<Props> = ({open}) => {
    const auth = useAuth();
    const user = GetUserStorage();
    const [nav, setNav] = useState(false);

    const LogOut = (userId: number) => {
        const LogOutFn = async () => {
            const token = `${window.localStorage.getItem('token')}`;
            fetch(`${BASIC_URL}/auth/logout/${userId}`, {
                method: 'PUT',
                headers: {
                    "Content-Type":"application/json",
                    "token":token
                }
            });
            DeleteStorage();
            auth.setSession(false);
        }
        LogOutFn();
    }

    return (
        <header className='h-full'>
            <div className='w-full bg-gradient-to-r from-violet-600 to-purple-600 top-0 p-5 flex justify-between items-center'>
                <h1 className='text-center text-white font-mono text-xl font-bold'>
                    {`${user.name} ${user.lastname}`}
                </h1>
                <div className="relative max-w-sm">
                    <div className="iniline-flex bg-white border rounded-md">
                        <a href='#' onClick={()=>setNav(!nav)} className='px-4 py-2 text-sm text-gray-600 hover:text-gray-700 rounded-l-md'>+</a>
                    </div>
                    
                    <div className={`${nav ? 'bloack' : 'hidden'} absolute right-0 z-10 w-56 mt-4 origin-top-right bg-white border border-gray-100 rounded-md shadow-lg`}>
                        <span onClick={()=>open(true)} className='block px-4 py-2 text-sm text-gray-500 rounded-lg hover:bg-gray-50 hover:text-gray-700'>Cambiar contraseña</span>
                        <span onClick={()=>{
                            LogOut(user.id);
                            // window.location.reload();
                            Navigate('/');
                        }} className='block px-4 py-2 text-sm text-gray-500 rounded-lg hover:bg-gray-50 hover:text-gray-700'>salir</span>
                    </div>
                </div>
            </div>
        </header>
    );
}