import { BASIC_URL } from "../../../constants";
import { useAuth } from "../../../context/AuthContext";
import { DeleteStorage } from "../../../service/DeleteStorage";
import { GetUserStorage } from "../../../service/UserService";

export const Header = () => {
    const auth = useAuth();
    const user = GetUserStorage();
    const ROL = user.role === 'DIRECT' ? 'Director' : user.role == 'ADMIN' ? 'Administrador' : 'Secretario';

    const LogOut = (userId: number) => {
        const LogOutFn = async () => {
            const token = `${window.localStorage.getItem('token')}`;
            await fetch(`${BASIC_URL}/auth/logout/${userId}`, {
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
                <h1 className='text-center text-white font-mono text-3xl'>
                    {`${ROL}`}
                    <span className='mx-2 font-extrabold text-purple-950'>
                        {`${user.name} ${user.lastname}`}
                    </span>
                </h1>
                <h6 className='text-center text-purple-50 font-mono text-lg font-bold flex gap-x-5 items-center'>
                    <button
                        onClick={()=>LogOut(user.id)}
                        className='text-center bg-purple-600 hover:bg-purple-800 px-5 py-2 rounded-md font-mono text-lg font-bold mx-auto text-white'
                    >
                        Salir
                    </button>
                </h6>
                
            </div>
        </header>
    );
}