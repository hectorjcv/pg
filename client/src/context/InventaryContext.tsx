import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useEffect, useState } from "react"
import { ObjectsCompletedList } from "../types/ObjectsGroupSub";
import { BASIC_URL } from "../constants";
import { GlobalFilter } from "../types/FiltersType";

interface SelectBien {
    select: boolean,
    selected: ObjectsCompletedList | null,
} 

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
    updateUpdate: Dispatch<SetStateAction<boolean>>,
    filter: GlobalFilter,
    updateFilter: Dispatch<SetStateAction<GlobalFilter>>,

    select: SelectBien,
    updateSelect: Dispatch<SetStateAction<SelectBien>>,
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
    updateTake: ()=>{},
    filter: { type:'ALL', filter:null },
    updateFilter: ()=>{},

    select: { select:false, selected:null },
    updateSelect: ()=>{}
}

export const InventaryContext = createContext(DefaultContext);

export const InventaryProvider = ({children}: {children: ReactNode}) => {
    const [count, setCount] = useState(0);
    const [pag, setPage] = useState<number>(0);
    const [sk, setSk] = useState(0);
    const [take, settake] = useState(10);
    const [objects, setObjects] = useState<ObjectsCompletedList | null>(null);
    const [objectsCurrent, setObjectsCurrent] = useState<ObjectsCompletedList | null>(null);
    const [toUpdate, setToUpdate] = useState(false);
    const [filter, setFilter] = useState<GlobalFilter>(DefaultContext.filter);

    const [select, setSelect] = useState<SelectBien>({ select:false, selected:null });

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
            const url = `${BASIC_URL}/admin/objects`;
            const res = await fetch(url, RequesOptions);
            const json = await res.json();
            const objs:ObjectsCompletedList = json.body.ObjetsResult;
            setCount(json.body.count);
            setObjectsCurrent(objs);
        }
        Getting();
    }, [toUpdate, pag]);

    useEffect(()=>{

        if(filter.type === 'ALL') {
            setObjects(objectsCurrent);
            return
        }

        if(filter.type === 'DEPARTAMENTO' && objectsCurrent !== null) {
            if(filter.filter.dep_name === 'ALL') {
                setObjects(objectsCurrent);
                return
            }
            const newsObjest = objectsCurrent.filter(i => i.dep_reference.departament_name === filter.filter.dep_name);
            setObjects(newsObjest);
            return;
        }

        if(filter.type === 'NOMBRE' && objectsCurrent !== null) {
            const newsObjest = objectsCurrent.filter(i => i.name.includes(filter.filter.name));
            setObjects(newsObjest);
            return;
        }


        if(filter.type === 'CODIGO' && objectsCurrent !== null) {
            const newsObjest = objectsCurrent.filter(i => i.n_identification.startsWith(filter.filter.code));
            setObjects(newsObjest);
            return;
        }

        if(filter.type === 'VALOR' && objectsCurrent !== null) {
            if(filter.filter.max === 0) {
                const newsObjest = objectsCurrent.filter(i => i.price >= filter.filter.min);
                setObjects(newsObjest);
                return;
            }

            if(filter.filter.min === 0) {
                const newsObjest = objectsCurrent.filter(i => i.price <= filter.filter.max);
                setObjects(newsObjest);
                return;
            }

            const newsObjest = objectsCurrent.filter(i => i.price >= filter.filter.min && i.price <= filter.filter.max);
            setObjects(newsObjest);
            return;
        }

        if(filter.type === 'CANTIDAD' && objectsCurrent !== null) {
            if(filter.filter.max === 0) {
                const newsObjest = objectsCurrent.filter(i => i.quantity_reference && i.quantity_reference.fisica >= filter.filter.min);
                setObjects(newsObjest);
                return;
            }

            if(filter.filter.min === 0) {
                const newsObjest = objectsCurrent.filter(i => i.quantity_reference && i.quantity_reference?.fisica <= filter.filter.max);
                setObjects(newsObjest);
                return;
            }

            const newsObjest = objectsCurrent.filter(i => i.quantity_reference && i.quantity_reference?.fisica >= filter.filter.min && i.quantity_reference?.fisica <= filter.filter.max);
            setObjects(newsObjest);
            return;
        }

    }, [filter, objectsCurrent])

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
            updateUpdate: setToUpdate,
            filter:filter,
            updateFilter: setFilter,
            select,
            updateSelect: setSelect
        }}>
            {children}
        </InventaryContext.Provider>
    )
}

export const useInventary = () => useContext(InventaryContext);
