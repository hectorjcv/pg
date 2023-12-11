import { useEffect, useState } from "react";
import { CardSingle } from "./CardSingle";
import { TextTitle } from "./TextTypes";
import { ActivitiesList, ActivitiesResponse } from "../../../types/ActivitiesType";
import { BASIC_URL } from "../../../constants";
import { GetUserStorage } from "../../../service/UserService";

export const Activities = () => {
    const user = GetUserStorage();
    const ROL = user.role == 'DIRECT' ? true : false
    const [logs, setLogs] = useState<ActivitiesList | null>(null);

    useEffect(() => {
        const GetLogs = async () => {
            const token = `${window.localStorage.getItem('token')}`;
            const RequesOptions = {
                "method": "GET",
                "headers":{
                    "token":token,
                    "Content-Type":"application/json"
                },
            };
            const query = ROL ? `id=${user.id}` : ''
            const url = `${BASIC_URL}/admin/logs${query}`;
            const res = await fetch(url, RequesOptions);
            if(!res.ok) return;
            const json = await res.json() as ActivitiesResponse;
            setLogs(json.body); 
        }
        GetLogs();
    }, [])

    return (
        <>
        
        <CardSingle>
            <TextTitle text='Actividades' />
            {
                logs &&
                <ul className='grid grid-cols-1 gap-y-3'>
                    {
                        logs.map(item => (
                            <li className='shadow grid grid-cols-3'>
                                <span>{item.code}</span>
                                <span>{item.ci}</span>
                                <span>{item.description}</span>
                            </li>
                        ))
                    }
                </ul>
            }
        </CardSingle>
        </>
    );
}