import { FormEvent, useEffect, useState } from "react";
import { TextTitle } from "../DEFAULT/TextTypes"
import { ObjNotification, useNotification } from "../../../context/NotificationContext";
import { BASIC_URL } from "../../../constants";
import { DepList, ResponseGet } from "../../../types/DepTypes";

type query_set = 'C' | 'U';

export const SecctionDep = () => {
    const noti = useNotification();
    const [dep, setDep] = useState('');
    const [idDep, setIdDep] = useState(0);
    const [listDep, setListDep] = useState<DepList | null>(null);
    const [query, setQuery] = useState<query_set>('C');
    const [change, setChange] = useState(false);
    
    useEffect(()=>{
        const DegDep = async () => {
            const token = `${window.localStorage.getItem('token')}`;
            const RequesOptions = {
                "method": "GET",
                "headers":{
                    "token":token,
                    "Content-Type":"application/json"
                }
            };
            const url = `${BASIC_URL}/admin/dep`;
            const res = await fetch(url, RequesOptions);
            if(!res.ok) return;
            const json = await res.json() as ResponseGet
            setListDep(json.body);
        } 
        DegDep()
    }, [change])

    const handleSumit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const CreateDep = async () => {
            const DepSend = {
                dep_name: dep
            }
            const token = `${window.localStorage.getItem('token')}`;
            const RequesOptions = {
                "method": query == 'C' ? "POST" : "PUT",
                "headers":{
                    "token":token,
                    "Content-Type":"application/json"
                },
                "body":JSON.stringify(DepSend)
            };
            const url = query == 'C' ? `${BASIC_URL}/admin/dep` : `${BASIC_URL}/admin/dep/${idDep}`;
            const res = await fetch(url, RequesOptions);
            if(!res.ok) {
                const newNoti: ObjNotification = {
                    type: 'DANGER',
                    notification: 'Error al crear el departemento'
                }
                noti.updateActive(true);
                noti.newNotification(newNoti);
                return
            }
            setChange(!change);
            const newNoti: ObjNotification = {
                type: 'SUCCESS',
                notification: 'Departamento'
            }
            noti.updateActive(true);
            noti.newNotification(newNoti);
            setQuery('C');
            setDep('');
            setIdDep(0);
            return;
        } 
        CreateDep()
    }

    return(
        <section className='grid grid-cols-[.5fr_1fr] place-items-center gap-4'>
            <form onSubmit={handleSumit} className='grid gap-3'>
                <TextTitle text='Crear' />
                <div>
                    <label className='text-xl'>Departamento</label>
                    <input type='text' value={dep} onChange={(event)=>setDep(event.target.value)} required placeholder='Nombre' className='border w-full p-3 rounded-md bg-white shadow text-lg' />
                </div>
                <input type='submit' value={`${query == 'C' ? 'Crear' : 'Actualizar'}`} className='w-full bg-blue-500 hover:bg-blue-600 text-lg font-bold py-2 text-white rounded-md mt-3' />
                
            </form>
            <div className='w-full'>
                <TextTitle text='Departamentos' />
                <ul className='grid gap-y-3 w-full'>
                    <li 
                        className='w-full flex justify-between rounded-md' 
                    >
                        <span className='p-3 font-bold'>Nombre</span>
                        <button>
                        </button>
                    </li>
                    {
                        listDep === null
                        ? <>Cargando...</>
                        : <>
                            {
                                listDep.map((item) => (
                                    <li 
                                        className='w-full flex justify-between shadow-md rounded-md' 
                                        key={item.id}
                                    >
                                        <span className='p-3 font-bold'>{item.departament_name}</span>
                                        <button 
                                            onClick={()=>{
                                                setDep(item.departament_name);
                                                setIdDep(item.id);
                                                setQuery('U')
                                            }}
                                            className='p-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded-r-md'
                                        >
                                            editar
                                        </button>
                                    </li>
                                ))
                            }
                        </>
                    }
                </ul>
            </div>
        </section>
    )
}