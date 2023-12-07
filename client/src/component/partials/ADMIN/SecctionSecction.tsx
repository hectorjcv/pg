import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Secction, SecctionCompletedList } from "../../../types/ObjectsGroupSub";
import { BASIC_URL } from "../../../constants";
import { TextSubtitle } from "../DEFAULT/TextTypes";
import { ObjNotification, useNotification } from "../../../context/NotificationContext";

type StateForm = 'Crear' | 'Actualizar';
export const SecctionSecction = () => {
    const noti = useNotification();
    const [secctions, setSecction] = useState<SecctionCompletedList | null>(null);
    const [data, setData] = useState<Secction | null>(null);
    const [read, setRead] = useState(false);
    const [send, setSend] = useState<StateForm>('Crear');

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newSecction:Secction = {
            id: data?.id,
            secction: event.target.value
        }
        setData(newSecction);
    }

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const SaveSecction = async () => {
            if(data === null) return;
            const token = `${window.localStorage.getItem('token')}`
            const RequesOptions = {
                "method": send == "Crear" ? "POST" : "PUT",
                "headers":{
                    "token":token,
                    "Content-Type":"application/json"
                },
                "body":JSON.stringify(data)
            };
            if(send == 'Actualizar' && data.id) {
                const url = `${BASIC_URL}/admin/secction/${data.id}`
                const res = await fetch(url, RequesOptions);
                if(!res.ok) return;

                const json = await res.json();
                console.log(json.response);
                if(json.response == "SUCCESS_UPDATE_SECCTION") {
                    const newNoti: ObjNotification = {
                        type: 'SUCCESS',
                        notification: `sección actualizado exitosamente.`
                    }
                    noti.newNotification(newNoti);
                    noti.updateActive(true);
                } else {
                    const newNoti: ObjNotification = {
                        type: 'DANGER',
                        notification: 'Error, verifica los datos'
                    }
                    noti.newNotification(newNoti);
                    noti.updateActive(true);
                }
                setData({secction:''});
                setSend('Crear');
                setRead(!read);
                return
            }
            const url = `${BASIC_URL}/admin/secction`;
            const res = await fetch(url, RequesOptions);
            if(!res.ok) return;

            const json = await res.json();
                console.log(json.response);
                if(json.response == 'SUCCESS_CREATE_SECCTION') {
                    const newNoti: ObjNotification = {
                        type: 'SUCCESS',
                        notification: `sección creado exitosamente.`
                    }
                    noti.newNotification(newNoti);
                    noti.updateActive(true);
                } else {
                    const newNoti: ObjNotification = {
                        type: 'DANGER',
                        notification: 'Error, verifica los datos'
                    }
                    noti.newNotification(newNoti);
                    noti.updateActive(true);
                }
            setData({secction:''});
            setRead(!read);
        }
        SaveSecction();
    }

    const ToUpdate = (secc: Secction) => {
        setSend("Actualizar");
        setData({secction:secc.secction, id:secc.id})
    }

    useEffect(()=> {
        const GetGroups = async () => {
            const token = `${window.localStorage.getItem('token')}`
            const RequesOptions = {
                "method":"GET",
                "headers":{
                    "token":token,
                    "Content-Type":"application/json"
                }
            };
            const res = await fetch(`${BASIC_URL}/admin/secction`, RequesOptions);
            const json = await res.json();
            const secctions: SecctionCompletedList = json.body.secctions;
            setSecction(secctions);
            console.log(json);
        }
        GetGroups();
    },[read]);

    return (
        <div className='grid md:grid-cols-[1fr_2fr] p-3 gap-4'>
            <section>
                <TextSubtitle text={`${send} Sección`} />
                <form className='grid gap-y-3' onSubmit={handleSubmit}>
                    <input type='text' value={data?.secction} onChange={handleChange} placeholder="Sección" className='rounded-md w-full p-3 focus:outline-none border bg-white shadow' />
                    <input type='submit' value={`${send}`} className="w-full bg-purple-600 hover:bg-purple-700 rounded-md py-3 text-white font-bold" />
                </form>
            </section>
            <section>
                {
                    secctions != null
                    ? <ul className='grid gap-3'>{
                        secctions.map((item)=>(
                            <li key={item.id} className='list-none pl-3 bg-white rounded-md flex justify-between items-center border'>
                                <span className='font-bold text-gray-800 text-lg'>{item.secction}</span>
                                <div>
                                    <button
                                        onClick={()=>ToUpdate(item)}
                                        className='bg-green-400 hover:bg-green-500 rounded-r-md py-3 px-3 h-full'
                                    >
                                        Actualizar
                                    </button>
                                </div>
                            </li>
                        ))
                    }</ul>
                    : <></>
                    
                }
            </section>
        </div>
    );
}