import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useEffect, useState } from "react"
import { ObjectsCompletedList, ObjectCompleted } from "../types/ObjectsGroupSub";
import { BASIC_URL } from "../constants";

interface AuthContextInterface {
    count: number,
    updateCount: Dispatch<SetStateAction<number>>,
    pag: number,
    updatePag: Dispatch<SetStateAction<number>>,
    sk: number,
    updateSk: Dispatch<SetStateAction<number>>,
    take: number,
    updateTake: Dispatch<SetStateAction<number>>,
    objects: ObjectsCompletedList | null,
    updateObjects: Dispatch<SetStateAction<ObjectsCompletedList | null>>,
    toUpdate: boolean,
    updateUpdate: Dispatch<SetStateAction<boolean>>
}

const DefaultContext: AuthContextInterface = {
    pag: 0,
    updatePag: ()=>{},
    count: 0,
    updateCount: ()=>{},
    sk: 0,
    updateSk: ()=>{},
    objects: null,
    updateObjects: ()=>{},
    toUpdate: false,
    updateUpdate: ()=>{},
    take:10,
    updateTake: ()=>{} 
}

export const InventaryContext = createContext(DefaultContext);

export const InventaryProvider = ({children}: {children: ReactNode}) => {
    const [count, setCount] = useState(0);
    const [pag, setPage] = useState<number>(0);
    const [sk, setSk] = useState(0);
    const [take, settake] = useState(10);
    const [objects, setObjects] = useState<ObjectsCompletedList | null>(null);
    const [toUpdate, setToUpdate] = useState(false);

    useEffect(()=>{
        const Getting = async () => {
            const token = `${window.localStorage.getItem('token')}`
            const RequesOptions = {
                "method": "GET",
                "headers":{
                    "token":token,
                    "Content-Type":"application/json"
                }
            };
            const url = `${BASIC_URL}/admin/objects/?take=${take}&sk=${sk*10}`;
            const res = await fetch(url, RequesOptions);
            const json = await res.json();
            const objs:ObjectsCompletedList = json.body.ObjetsResult;
            setCount(json.body.count);
            setObjects(objs);
        }
        Getting();
    }, [toUpdate, pag]);

    return (
        <InventaryContext.Provider value={{
            count: count,
            updateCount: setCount,
            pag: pag,
            updatePag: setPage,
            objects: objects,
            take:take,
            sk:sk,
            updateSk:setSk,
            updateTake:settake,
            updateObjects: setObjects,
            toUpdate: toUpdate,
            updateUpdate: setToUpdate
        }}>
            {children}
        </InventaryContext.Provider>
    )
}

export const useInventary = () => useContext(InventaryContext);
