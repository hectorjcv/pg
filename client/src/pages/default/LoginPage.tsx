// import { Navigate } from "../../hooks/useNavigate";

import { useState } from "react";
import { BASIC_URL } from "../../constants";
import { ResponseLogin } from "../../types/DefaultTypes";
import { useAuth } from "../../context/AuthContext";
import { OffSession } from "../../hooks/useVerifySession";
import { Navigate } from "../../hooks/useNavigate";

type roles = 'DIRECT' | 'ADMIN';

const LoginPage = () => {
    const auth = useAuth();

    OffSession(auth.session);

    const [role, setRole] = useState<roles | null>(null);
    const [email, setEmail] = useState('');
    const [ci, setCi] = useState('');

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const Data = {role, ci, email};
        const ServiceLogin = async () => {
            const REQUES_OPTIONS = {
                method:'POST',
                headers: { "Content-Type":"application/json" },
                body: JSON.stringify(Data)
            }
            
            const res = await fetch(`${BASIC_URL}/auth/login`, REQUES_OPTIONS);
            if(!res.ok) return console.log(res);
            const result: ResponseLogin = await res.json();

            window.localStorage.setItem('session', 'true');
            window.localStorage.setItem('token', result.body.token);
            window.localStorage.setItem('user', JSON.stringify(result.body.user));

            auth.setSession(true);
            console.log(result.body.user.role, 'DIRECT', result.body.user.role == 'DIRECT');
            if(result.body.user.role == 'DIRECT') return Navigate('/direct/dashboard');
            return Navigate('/admin/dashboard');
        }
        ServiceLogin();
        
    }

    return (
        <div className='w-screen min-h-screen flex justify-center items-center bg-purple-600'>
            <div className='w-[90%] lg:w-[50%] py-10 bg-white rounded-xl shadow flex flex-col justify-center items-center'>
                <form className='w-[80%] lg:w-[60%]' onSubmit={handleSubmit}>
                    <h2 className='font-extrabold text-purple-900 text-4xl animate-pulse text-center'>Bienvenido {role ? role === 'DIRECT' ? 'Director' : 'Administador' : ''}</h2>
                    
                    {
                        role
                        ?   <div className='mt-5 flex justify-center items-center flex-col'>
                                <h3 className='font-extrabold text-purple-900 text-2xl text-center'>Ingresa tus datos</h3>

                                <input onChange={(e)=> setEmail(e.target.value)} type='email' placeholder="micorreo@gmail.com" className='bg-purple-50 mt-5 border border-purple-600 font-bold focus:outline-none text-purple-900 p-3 rounded-lg w-full' />
                                <input onChange={(e)=> setCi(e.target.value)} type='text' placeholder="12 345 678" className='bg-purple-50 mt-5 border border-purple-600 font-bold focus:outline-none text-purple-900 p-3 rounded-lg w-full' />

                                <div className='w-full bottom-0 flex justify-between mt-5 '>
                                    <button type='button' onClick={()=>{setRole(null)}} className='bg-purple-600 hover:bg-purple-700 text-purple-50 px-8 py-4 rounded-xl text-lg font-bold'>Cargo</button>
                                    <button type='submit' className='bg-purple-600 hover:bg-purple-700 text-purple-50 px-8 py-4 rounded-xl text-lg font-bold'>Entrar</button>
                                </div>

                            </div>
                        :   <div className='mt-5 flex justify-center items-center flex-col'>
                                <h3 className='font-extrabold text-purple-900 text-2xl text-center'>¿Eres?</h3>
                                <button type='button' onClick={()=>{setRole('DIRECT')}} className='w-full transition-colors text-xl font-bold font-mono text-center mt-5 py-4 border border-purple-600 text-purple-600 hover:text-purple-50 hover:bg-purple-600 rounded-xl'>Director</button>
                                <button type='button' onClick={()=>{setRole('ADMIN')}} className='w-full transition-colors text-xl font-bold font-mono text-center mt-5 py-4 border border-purple-600 text-purple-600 hover:text-purple-50 hover:bg-purple-600 rounded-xl'>Administrador</button>
                            </div>
                    }
                </form>
            </div>
        </div>
    )
}

export { LoginPage }
