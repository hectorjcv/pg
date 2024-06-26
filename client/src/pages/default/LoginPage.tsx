// import { Navigate } from "../../hooks/useNavigate";
import LOGO from '../../assets/logo.jpg';
import LOGO2 from '../../assets/logo2.jpg';
import FONDO from '../../assets/fondo.jpg';


import { useState } from "react";
import { BASIC_URL } from "../../constants";
import { ResponseLogin } from "../../types/DefaultTypes";
import { useAuth } from "../../context/AuthContext";
import { OffSession } from "../../hooks/useVerifySession";
import { Navigate } from "../../hooks/useNavigate";
import { ObjNotification, useNotification } from '../../context/NotificationContext';
import { Notification } from '../../component/partials/DEFAULT/Notification';

const LoginPage = () => {
    const auth = useAuth();
    const noti = useNotification();

    OffSession(auth.session);

    const [email, setEmail] = useState('');
    const [ci, setCi] = useState('');

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const Data = {ci, email};
        const ServiceLogin = async () => {
            const REQUES_OPTIONS = {
                method:'POST',
                headers: { "Content-Type":"application/json" },
                body: JSON.stringify(Data)
            }
            try {
                const res = await fetch(`${BASIC_URL}/auth/login`, REQUES_OPTIONS);
                if(!res.ok) {
                    console.log('qlq')
                    noti.updateActive(true);
                    const newNoti: ObjNotification = {
                        type: 'DANGER',
                        notification: `Error verifica tus datos`
                    }
                    noti.newNotification(newNoti);
                    return console.log(res);
                }
                const result: ResponseLogin = await res.json();

                window.localStorage.setItem('session', 'true');
                window.localStorage.setItem('token', result.body.token);
                window.localStorage.setItem('user', JSON.stringify(result.body.user));

                auth.setSession(true);

                noti.updateActive(true);
                const newNoti: ObjNotification = {
                    type: 'SUCCESS',
                    notification: `Bienvenido ${result.body.user.ci}`
                }
                noti.newNotification(newNoti);
                if(result.body.user.role == 'DIRECT') return Navigate('/direct/dashboard');
                if(result.body.user.role == 'SECRETARY') return Navigate('/secretary/dashboard');
                return Navigate('/admin/dashboard');
            } catch (error) {
                noti.updateActive(true);
                const newNoti: ObjNotification = {
                    type: 'DANGER',
                    notification: `Error verifica tus datos`
                }
                return noti.newNotification(newNoti);                
            }
            
        }
        ServiceLogin();
        
    }

    return (
        <>
            { noti.active && <Notification /> }
            <div 
                className='w-screen min-h-screen' 
                style={{ 
                    backgroundImage:`url("${FONDO}")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: '100% 100%'
                }}
            >
                
                <div className='w-screen min-h-screen flex justify-center flex-col items-center relative bg-gray-950 bg-opacity-50'>
                    
                    <div className='py-5 w-[90%] lg:w-[50%] rounded-t-xl bg-white relative'>
                        <h1 className='font-extralight text-4xl text-center'>SISTEMA DE BIENES</h1>
                        <img src={LOGO2} className='w-36 absolute top-0 left-0 rounded-tl-xl p-2' />
                        <img src={LOGO} className='w-28 absolute top-0 right-0 rounded-tl-xl p-2' />
                    </div>

                    <div className='w-[90%] lg:w-[50%] py-10 bg-white rounded-b-xl shadow flex flex-col justify-center items-center'>
                        
                        <form className='w-[90%] lg:w-[60%]' onSubmit={handleSubmit}>
                            <div className='mt-5 flex justify-center items-center flex-col'>
                                <h3 className='font-extrabold text-blue-900 text-2xl text-center'>Ingresa tus datos</h3>

                                <label className='text-lg text-gray-800'>Ingrese Correo</label>
                                <input onChange={(e)=> setEmail(e.target.value)} type='email' placeholder="" className='bg-blue-50 mt-5 border border-blue-600 font-bold focus:outline-none text-blue-900 p-3 rounded-lg w-full' />
                                <label className='text-lg text-gray-800'>Ingrese Contraseña</label>
                                <input onChange={(e)=> setCi(e.target.value)} type='password' placeholder="" className='bg-blue-50 mt-5 border border-blue-600 font-bold focus:outline-none text-blue-900 p-3 rounded-lg w-full' />

                                <div className='w-full bottom-0 flex justify-between mt-5 '>
                                    <button type='submit' className='bg-blue-600 hover:bg-blue-700 text-blue-50 px-8 py-4 rounded-xl text-lg font-bold'>Entrar</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export { LoginPage }
