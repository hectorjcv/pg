import { ChangeEvent, useEffect, useState } from "react";
import { DepList, ResponseGet } from "../../../../types/DepTypes";
import { BASIC_URL } from "../../../../constants";
import { DepFilter } from "../../../../types/FiltersType";
import { useInventary } from "../../../../context/InventaryContext";

export const DepartamentoFilter = () => {
    const inv = useInventary();
    const [listDep, setListDep] = useState<DepList | null>(null);
    const [depFilter, setDepFilter] = useState<DepFilter>({ type:'DEPARTAMENTO', filter:{ dep_name:'ALL' } });

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
    }, [])

    const HandleChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const val = event.target.value;
        const depAfter = {
            ...depFilter,
            filter: { dep_name:val }
        }
        setDepFilter(depAfter);
        inv.updateFilter(depAfter);
    }

    return (
        <div className='flex justify-center items-center gap-x-5 my-auto'>
            <h2 className='text-xl text-purple-900 font-bold '>Filtrar por Departamento</h2>
            
            {
                !listDep 
                ? <h3>Error, no existen departamentos</h3>
                : <select onChange={HandleChange} className='py-2 px-5 text-black font-bold text-lg'>
                    <option selected value='ALL'>Todos</option>
                    {
                        listDep.map(dep => (
                            <option value={dep.departament_name} key={dep.id}>{dep.departament_name}</option>
                        ))
                    }
                </select>
            }

        </div>
    );
}
