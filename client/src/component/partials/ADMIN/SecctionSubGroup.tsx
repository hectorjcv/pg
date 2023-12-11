import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { GroupsCompletedList, SubGroups, SubGroupsCompleted, SubGroupsCompletedList } from "../../../types/ObjectsGroupSub";
import { BASIC_URL } from "../../../constants";
import { TextSubtitle } from "../DEFAULT/TextTypes";
import { ObjNotification, useNotification } from "../../../context/NotificationContext";
import { GetUserStorage } from "../../../service/UserService";

type StateForm = 'Crear' | 'Actualizar';
export const SecctionSubGroup = () => {
    const noti = useNotification();
    const user = GetUserStorage();
    const ROL = user.role === 'SECRETARY' ? true : false;
    const [subgroups, setSubGroups] = useState<SubGroupsCompletedList | null>(null);
    const [definedGroup, setDefineGroups] = useState<GroupsCompletedList | null>(null);
    const [data, setData] = useState<SubGroups | null>(null);
    const [read, setRead] = useState(false);
    const [send, setSend] = useState<StateForm>('Crear');

    const handleChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
        const newSubGroupas:SubGroups = {
            id: data?.id,
            sub_group: event.target.value,
            group_id: parseInt(`${data?.group_id}`)
        }
        setData(newSubGroupas);
    }

    const handleChangeSelect = (event: ChangeEvent<HTMLSelectElement>) => {
        const newSubGroupas:SubGroups = {
            id: data?.id,
            sub_group: `${data?.sub_group}`,
            group_id: parseInt(event.target.value)
        }
        setData(newSubGroupas);
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
            console.log(data);
            if(send == 'Actualizar' && data.id) {
                const url = `${BASIC_URL}/admin/subgroup/${data.id}`
                console.log(url);
                const res = await fetch(url, RequesOptions);
                if(!res.ok) return;
                const json = await res.json();
                if(json.response == "SUCCESS_UPDATE_SUB_GROUP") {
                    const newNoti: ObjNotification = {
                        type: 'SUCCESS',
                        notification: `SubGrupo actualizado exitosamente.`
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
                setData({sub_group:'',group_id:0});
                setSend('Crear');
                return setRead(!read);
            }
            const url = `${BASIC_URL}/admin/subgroup`;
            const res = await fetch(url, RequesOptions);
            if(!res.ok) return;

            const json = await res.json();
            console.log(json.response);
            if(json.response == "SUCCESS_CREATE_SUB_GROUP") {
                const newNoti: ObjNotification = {
                    type: 'SUCCESS',
                    notification: `SubGrupo creado exitosamente.`
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
            setData({sub_group:'', group_id:0});
            return setRead(!read);
        }
        SaveGroup();
    }

    const ToUpdate = (subgroup: SubGroupsCompleted) => {
        setSend("Actualizar");
        console.log(subgroup);
        setData({sub_group:subgroup.sub_group, id:subgroup.id, group_id:subgroup.group_id});
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
            setDefineGroups(groups);
        }
        GetGroups();
    },[]);

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
            const res = await fetch(`${BASIC_URL}/admin/subgroup`, RequesOptions);
            if(!res.ok) return;
            const json = await res.json();
            const subgroups: SubGroupsCompletedList = json.body.subGroupsAll;
            setSubGroups(subgroups);
        }
        GetGroups();
    }, [read]);

    return (
        <div className={`grid md:grid-cols-[1fr] p-3 gap-4`}>
            {ROL && <section>
                <TextSubtitle text={`${send} Sub Grupo`} />
                <form className='grid gap-y-3' onSubmit={handleSubmit}>
                    <input 
                        type='text' 
                        value={data?.sub_group} 
                        onChange={handleChangeInput} 
                        placeholder="Sub Grupo" 
                        className='rounded-md w-full p-3 focus:outline-none border bg-white shadow' 
                        />
                    <select className='rounded-md w-full p-3 focus:outline-none border bg-white shadow' onChange={handleChangeSelect}>
                        <option value='1' selected>Selecciona una opcion</option>
                        {
                            definedGroup != null 
                            ? <>{
                                definedGroup.map((item) => (
                                    <option key={item.id} value={item.id}>{item.group}</option>
                                ))
                            }</>
                            : <></>
                        }
                    </select>
                    <input type='submit' value={`${send}`} className="w-full bg-purple-600 hover:bg-purple-700 rounded-md py-3 text-white font-bold" />
                </form>
            </section>}
            <section>
                {
                    subgroups &&
                    <ul className='grid gap-3'>{
                        subgroups.map((item)=>(
                            <li key={item.id} className='list-none py-3 pl-3 bg-white rounded-md flex justify-between items-center border'>
                               <span className='font-bold text-purple-800 text-lg'>{item.group_reference?.group}</span>
                                <span className='font-bold text-gray-800 text-lg'>{item.sub_group}</span>
                                <div>
                                    {ROL && <button
                                        onClick={()=>ToUpdate(item)}
                                        className='bg-green-400 hover:bg-green-500 rounded-r-md py-3 px-3 h-full'
                                    >
                                        Actualizar
                                    </button>}
                                </div>
                            </li>
                        ))
                    }</ul>                    
                }
            </section>
        </div>
    );
}