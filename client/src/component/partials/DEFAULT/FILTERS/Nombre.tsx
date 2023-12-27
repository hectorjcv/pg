import { ChangeEvent, useState } from "react";
import { NombreFilter as NombreFilterType } from "../../../../types/FiltersType";
import { useInventary } from "../../../../context/InventaryContext";

export const NombreFilter = () => {
    const inv = useInventary();
    const [nameFilter, setNameFilter] = useState<NombreFilterType>({ type:'NOMBRE', filter:{ name:'' } });

    const HandleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const val = event.target.value;
        const nameAfter = {
            ...nameFilter,
            filter: { name:val }
        }
        setNameFilter(nameAfter);
        inv.updateFilter(nameAfter);
    }

    return (
        <div className='flex justify-center items-center gap-x-5 my-auto'>
            <h2 className='text-xl text-purple-900 font-bold '>Filtrar por Nombre</h2>
            
            <input 
                onChange={HandleChange} 
                className='py-2 px-5 text-black font-bold text-lg'
                placeholder='Nombre'
                />

        </div>
    );
}
