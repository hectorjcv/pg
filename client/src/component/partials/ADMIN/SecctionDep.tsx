import { FormEvent, useEffect, useState } from "react";
import { TextTitle } from "../DEFAULT/TextTypes"
import { ObjNotification, useNotification } from "../../../context/NotificationContext";
import { BASIC_URL } from "../../../constants";
import { DepList, ResponseGet } from "../../../types/DepTypes";
import { GetUserStorage } from "../../../service/UserService";
type query_set = 'C' | 'U';

export const SecctionDep = () => {
    const user = GetUserStorage();
    const ROL = user.role === 'SECRETARY' ? true : false;
    const noti = useNotification();
    const [dep, setDep] = useState('');
    const [unity, setUnity] = useState('');
    const [direction, setDirection] = useState('');
    const [service, setService] = useState('');
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
                dep_name: dep,
                unity_name: unity,
                service_name: service,
                direction_name: direction
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
        <section className={`grid ${ROL ? 'grid-cols-[.5fr_1fr]' : ''} place-items-center gap-4`}>
            { ROL && <form onSubmit={handleSumit} className='grid gap-3'>
                <TextTitle text='Crear' />
                <div>
                    <label className='text-sm'>Departamento</label>
                    <input type='text' value={dep} onChange={(event)=>setDep(event.target.value)} required placeholder='Departamento' className='border w-full p-3 rounded-md bg-white shadow text-xs' />
                </div>

                <div>
                    <label className='text-sm'>Dirección</label>
                    <input type='text' value={direction} onChange={(event)=>setDirection(event.target.value)} required placeholder='Departamento' className='border w-full p-3 rounded-md bg-white shadow text-xs' />
                </div>

                <div>
                    <label className='text-sm'>Unidad</label>
                    <input type='text' value={unity} onChange={(event)=>setUnity(event.target.value)} required placeholder='Unidad' className='border w-full p-3 rounded-md bg-white shadow text-xs' />
                </div>

                <div>
                    <label className='text-sm'>Servicio</label>
                    <input type='text' value={service} onChange={(event)=>setService(event.target.value)} required placeholder='Servicio' className='border w-full p-3 rounded-md bg-white shadow text-xs' />
                </div>

                <input type='submit' value={`${query == 'C' ? 'Crear' : 'Actualizar'}`} className='w-full bg-blue-500 hover:bg-blue-600 text-lg font-bold py-2 text-white rounded-md mt-3' />
                
            </form> }

            <div className='w-full'>
                <TextTitle text='Departamentos' />
                <table className='w-full'>
                    <thead>
                        <tr className='grid grid-cols-5'>
                            <td className='border py-1 text-xs'>Departamento</td>
                            <td className='border py-1 text-xs'>Dirección</td>
                            <td className='border py-1 text-xs'>Servicio</td>
                            <td className='border py-1 text-xs'>Unidad</td>
                            { ROL && <td></td> }
                        </tr>
                    </thead>
                    {
                        listDep === null
                        ? <>Cargando...</>
                        : <tbody className='grid'>
                            {
                                listDep.map((item) => (
                                    <tr 
                                        className='grid grid-cols-5'
                                        key={item.id}
                                    >
                                        <td className='border font-bold text-xs'>{item.departament_name}</td>
                                        <td className='border font-bold text-xs'>{item.direction_name}</td>
                                        <td className='border font-bold text-xs'>{item.service_name}</td>
                                        <td className='border font-bold text-xs'>{item.unity_name}</td>
                                       { ROL && <td className='border p-0'><button 
                                            onClick={()=>{
                                                setDep(item.departament_name);
                                                setIdDep(item.id);
                                                setQuery('U')
                                            }}
                                            className='bg-green-500 hover:bg-green-600 text-white font-bold w-full h-full'
                                        >
                                            editar
                                        </button></td> }
                                    </tr>
                                ))
                            }
                        </tbody>
                    }
                </table>
            </div>
        </section>
    )
}