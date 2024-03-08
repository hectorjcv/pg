import React, { Dispatch, SetStateAction, useState } from "react";
import { TextSubtitle } from "../DEFAULT/TextTypes";
import { BASIC_URL } from "../../../constants";
import { ObjNotification, useNotification } from "../../../context/NotificationContext";

type ROLE = 'DIRECT' | 'ADMIN' | 'SECRETARY'

interface AdminRegister {
    name: string,
    lastname:string,
    ci: string,
    phone: string,
    email: string,
    role: ROLE | null
}

const defaultAdmin: AdminRegister = {
    name: '',
    lastname:'',
    ci: '',
    phone: '',
    email: '',
    role: null
}

interface Props {
    cb?: () => void,
    close: Dispatch<SetStateAction<boolean>>
}

export const FormCreateAdmin: React.FC<Props> = ({cb, close}) => {
    const noti = useNotification();
    const [data, setData] = useState<AdminRegister>(defaultAdmin);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newData = {...data, [event.target.name]: event.target.value};
        setData(newData);
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(data);

        const RegisterAdmin = async () => {
            const RequestOptions = {
                method:'POST',
                headers: { "Content-Type":"application/json", "token":`${window.localStorage.getItem('token')}` },
                body: JSON.stringify(data)
            }

            const res = await fetch(`${BASIC_URL}/direct/admin/create`, RequestOptions);
            const response = await res.json();
            
            if(response.response === 'SUCCESS_ADMIN_CREATE') {
                const newNoti: ObjNotification = {
                    type: 'SUCCESS',
                    notification: 'Administrador Creado'
                }
                noti.newNotification(newNoti);
                noti.updateActive(true);
                close(false);
                if (cb) cb();
            } else {
                const newNoti: ObjNotification = {
                    type: 'DANGER',
                    notification: 'Error, verifica los datos'
                }
                noti.newNotification(newNoti);
                noti.updateActive(true);
            }
        }
        RegisterAdmin();
    }


    return (
        <div>
            <TextSubtitle text='Crear Administrador' />
            <form className='grid gap-y-3 mt-5' onSubmit={handleSubmit}>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
                    <div>
                        <label htmlFor="" className='text-lg text-gray-800 font-bold'>Nombre</label>
                        <input type='text' required name='name' onChange={handleChange} placeholder='Nombre' className='w-full bg-gray-50 border broder-blue-500 p-3 rounded-md focus:outline-none' />
                    </div>
                    <div>
                        <label htmlFor="" className='text-lg text-gray-800 font-bold'>Apellido</label>
                        <input type='text' required name='lastname' onChange={handleChange} placeholder='Apellido' className='w-full bg-gray-50 border broder-blue-500 p-3 rounded-md focus:outline-none' />
                    </div>
                    <div>
                        <label htmlFor="" className='text-lg text-gray-800 font-bold'>Correo</label>
                        <input type='email' required name='email' onChange={handleChange} placeholder='Correo' className='w-full bg-gray-50 border broder-blue-500 p-3 rounded-md focus:outline-none' />
                    </div>
                    <div>
                        <label htmlFor="" className='text-lg text-gray-800 font-bold'>Cédula</label>
                        <input type='text' required name='ci' onChange={handleChange} placeholder='Apellido' className='w-full bg-gray-50 border broder-blue-500 p-3 rounded-md focus:outline-none' />
                    </div>
                    <div>
                        <label htmlFor="" className='text-lg text-gray-800 font-bold'>Teléfono</label>
                        <input type='text' required name='phone' onChange={handleChange} placeholder='Teléfono' className='w-full bg-gray-50 border broder-blue-500 p-3 rounded-md focus:outline-none' />
                    </div>
                    <div>
                        <label htmlFor="" className='text-lg text-gray-800 font-bold'>Rol</label>
                        <select 
                            required 
                            name='role' 
                            onChange={(event)=> {
                                const role: ROLE = event.target.value as ROLE;
                                const newData = {...data, role: role};
                                setData(newData);
                            }} 
                            className='w-full bg-gray-50 border broder-blue-500 p-3 rounded-md focus:outline-none'
                        >
                            <option selected>Seleccione una opción</option>
                            <option value='SECRETARY'>Secretario</option>
                            <option value='ADMIN'>Inventariador</option>
                            </select>
                    </div>
                    
                    <input type='submit' value='Crear' className='cursor-pointer py-3 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-md' />
                    
                </div>
                
            </form>
        </div>
    );
}