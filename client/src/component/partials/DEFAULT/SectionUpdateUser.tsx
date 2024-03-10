import { FormEvent, useState } from "react";
import { ObjNotification, useNotification } from "../../../context/NotificationContext";
import { BASIC_URL } from "../../../constants";
import { GetUserStorage } from "../../../service/UserService";
import { UpdateUser, User } from "../../../types/DefaultTypes";

export const SectionUpdateData = () => {
    const noti = useNotification();
    const user = GetUserStorage();

    const [data, setData] = useState<UpdateUser>({
        name: user.name,
        lastname: user.lastname,
        phone: user.phone,
        email: user.email,
        ci: user.ci
    });


    const HandleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const SetPassword = async () => {
            const token = `${window.localStorage.getItem('token')}`;
                const body = data;

                const RequesOptions = {
                    "method": "PUT",
                    "headers":{
                        "token":token,
                        "Content-Type":"application/json"
                    },
                    "body":JSON.stringify(body)
                };
                const url = `${BASIC_URL}/auth/update`;
                const res = await fetch(url, RequesOptions);

                console.log(res);
                if(!res.ok) {
                    const Notification: ObjNotification = {
                        type:'DANGER',
                        notification: 'Error, intentelo más tarde'
                    }
                    noti.newNotification(Notification);
                    return noti.updateActive(true);
                }
                const json = await res.json();
                console.log(json);
                if(json.response == 'SUCCESS_UPDATE_DATA') {
                    const Notification: ObjNotification = {
                        type:'SUCCESS',
                        notification: 'Datos Actualizados'
                    }

                    const newAuth: User = {
                        ...user,
                        ci: data.ci,
                        email: data.email,
                        name: data.name,
                        lastname: data.lastname,
                        phone: data.phone                       
                    };

                    window.localStorage.removeItem('user');
                    window.localStorage.setItem('user', JSON.stringify(newAuth));

                    noti.newNotification(Notification);
                    return noti.updateActive(true);
                }
                const Notification: ObjNotification = {
                    type:'DANGER',
                    notification: 'Error, intentelo más tarde'
                }
                noti.newNotification(Notification);
                return noti.updateActive(true);
        }
        SetPassword();
    }

    return (
        <form onSubmit={HandleSubmit} className='grid lg:grid-cols-2 gap-y-3'>
            <div>
                <label className='text-xl font-bold text-gray-900'>Nombre</label>
                <input 
                    type="text"
                    onChange={(e)=> setData({...data, name:e.target.value})}
                    className='p-3 border-none outline-none rounded-1'
                    value={data.name}
                    placeholder="Nombre"
                    />
            </div>

            <div>
                <label className='text-xl font-bold text-gray-900'>Apellido</label>
                <input 
                    type="text"
                    onChange={(e)=> setData({...data, lastname:e.target.value})}
                    className='p-3 border-none outline-none rounded-1'
                    value={data.lastname}
                    placeholder="Apellido"
                    />
            </div>

            <div>
                <label className='text-xl font-bold text-gray-900'>Cédula</label>
                <input 
                    type="text"
                    onChange={(e)=> setData({...data, ci:e.target.value})}
                    className='p-3 border-none outline-none rounded-1'
                    value={data.ci}
                    placeholder="12345678"
                    />
            </div>

            <div>
                <label className='text-xl font-bold text-gray-900'>Telefono</label>
                <input 
                    type="text"
                    onChange={(e)=> setData({...data, phone:e.target.value})}
                    className='p-3 border-none outline-none rounded-1'
                    value={data.phone}
                    placeholder="04121234567"
                    />
            </div>

            <div>
                <label className='text-xl font-bold text-gray-900'>Correo</label>
                <input 
                    type="email"
                    onChange={(e)=> setData({...data, email:e.target.value})}
                    className='p-3 border-none outline-none rounded-1'
                    value={data.email}
                    placeholder="ejemplo@gmail.com"
                    />
            </div>

            <div>
                <input 
                    type='submit'
                    value='Actualizar'
                    className='w-full rounded-md bg-blue-400 hover:bg-purpl-500 p-2 text-lg'
                    />
            </div>
        </form>
    );
}
