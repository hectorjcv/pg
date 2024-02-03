import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Groups, GroupsCompleted, GroupsCompletedList } from "../../../types/ObjectsGroupSub";
import { BASIC_URL } from "../../../constants";
import { TextSubtitle, TextTitle } from "../DEFAULT/TextTypes";
import { ObjNotification, useNotification } from "../../../context/NotificationContext";
import { GetUserStorage } from "../../../service/UserService";

type StateForm = 'Crear' | 'Actualizar';
export const SecctionGroup = () => {
    const noti = useNotification();
    const user = GetUserStorage();    
    const ROL = user.role === 'SECRETARY' ? true : false;
    const [groups, setGroups] = useState<GroupsCompletedList | null>(null);
    const [data, setData] = useState<Groups | null>(null);
    const [read, setRead] = useState(false);
    const [send, setSend] = useState<StateForm>('Crear');

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newGroup:Groups = {
            id: data?.id,
            group: event.target.value
        }
        setData(newGroup);
    }

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const SaveGroup = async () => {
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
                const url = `${BASIC_URL}/admin/group/${data.id}`
                const res = await fetch(url, RequesOptions);
                if(!res.ok) return;

                res.json();
                setData({group:''});
                setSend('Crear');
                setRead(!read);
                return
            }
            const url = `${BASIC_URL}/admin/group`;
            const res = await fetch(url, RequesOptions);
            if(!res.ok) return;

            const json = await res.json();
            if(json.response == "SUCCESS_CREAte_GROUPS") {
                const newNoti: ObjNotification = {
                    type: 'SUCCESS',
                    notification: 'Grupo creado exitosamente.'
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
            setData({group:''});
            setRead(!read);
        }
        SaveGroup();
    }

    const ToUpdate = (group: GroupsCompleted) => {
        setSend("Actualizar");
        console.log(group);
        setData({group:group.group, id:group.id})
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
            const res = await fetch(`${BASIC_URL}/admin/group`, RequesOptions);
            const json = await res.json();
            const groups: GroupsCompletedList = json.body.groups;
            setGroups(groups);
            console.log(json);
        }
        GetGroups();
    },[read]);

    return (
        <div className={`grid ${ ROL ? 'grid-cols-[0.5fr_1fr]' : 'grid-cols-1'} p-3 gap-4 place-items-center`}>
            {
                ROL &&
                <section>
                    <TextSubtitle text={`${send} Grupo`} />
                    <form className='grid gap-y-3' onSubmit={handleSubmit}>
                        <input type='text' value={data?.group} onChange={handleChange} placeholder="Grupo" className='rounded-md w-full p-3 focus:outline-none border bg-white shadow' />
                        <input type='submit' value={`${send}`} className="w-full bg-purple-600 hover:bg-purple-700 rounded-md py-3 text-white font-bold" />
                    </form>
                </section>
            }
            <section className='w-full'>
                {
                    groups != null
                    ? <ul className='grid gap-3'>
                        <li className='list-none py-3 pl-3 bg-white rounded-md flex justify-between items-center border'>
                            <span className='font-bold text-gray-800 text-lg'>Nombre Del Grupo</span>
                            <button>
                            </button>
                            
                        </li>
                    {
                        groups.map((item)=>(
                            <li key={item.id} className='list-none py-3 pl-3 bg-white rounded-md flex justify-between items-center border'>
                                <span className='font-bold text-gray-800 text-lg'>{item.group}</span>
                                {
                                    ROL && 
                                    <div>
                                        <button
                                            onClick={()=>ToUpdate(item)}
                                            className='bg-green-400 hover:bg-green-500 rounded-r-md py-3 px-3 h-full'
                                        >
                                            Actualizar
                                        </button>
                                    </div>
                                }
                            </li>
                        ))
                    }</ul>
                    : <><TextTitle text='No tinees grupos' /></>                    
                }
            </section>
        </div>
    );
}