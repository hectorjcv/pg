import { ChangeEvent, FormEvent, useState } from "react";
import { ObjNotification, useNotification } from "../../../context/NotificationContext";
import { BASIC_URL } from "../../../constants";
import { GetUserStorage } from "../../../service/UserService";

export const FormUpdatePassword = () => {
    const noti = useNotification();
    const user = GetUserStorage();

    const [password, setPassword] = useState({last_password:'',new_password:''});

    const ChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
        const newPassword = {
            ...password,
            [event.target.name]: event.target.value
        }
        setPassword(newPassword);
    }

    const HandleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const SetPassword = async () => {
            const token = `${window.localStorage.getItem('token')}`;
                const body = {
                    last_password: password.last_password,
                    new_password: password.new_password
                }
                const RequesOptions = {
                    "method": "PUT",
                    "headers":{
                        "token":token,
                        "Content-Type":"application/json"
                    },
                    "body":JSON.stringify(body)
                };
                const url = `${BASIC_URL}/auth/password/${user.id}`;
                const res = await fetch(url, RequesOptions);
                if(!res.ok) {
                    const Notification: ObjNotification = {
                        type:'DANGER',
                        notification: 'Error, intentelo más tarde'
                    }
                    noti.newNotification(Notification);
                    return noti.updateActive(true);
                }
                const json = await res.json();
                if(json.response == 'SUCCESS_SET_PASSWORD') {
                    const Notification: ObjNotification = {
                        type:'SUCCESS',
                        notification: 'Contraseña actualizada'
                    }
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
        <form onSubmit={HandleSubmit} className='grid gap-y-3'>
            <div>
                <label className='text-xl font-bold text-gray-900'>Contraseña Actual</label>
                <input 
                    onChange={ChangePassword}
                    type='password'
                    name='last_password'
                    className='w-full rounded-md bg-purple-100 p-2 text-lg'
                    />
            </div>

            <div>
                <label className='text-xl font-bold text-gray-900'>Contraseña Nueva</label>
                <input 
                    onChange={ChangePassword}
                    type='password'
                    name='new_password'
                    className='w-full rounded-md bg-purple-100 p-2 text-lg'
                    />
            </div>
            <div>
                <input 
                    type='submit'
                    value='Actualizar'
                    className='w-full rounded-md bg-purple-400 hover:bg-purpl-500 p-2 text-lg'
                    />
            </div>
        </form>
    );
}