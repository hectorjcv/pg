import { ChangeEvent, useState } from "react";
import { CodigoFilter as CodigoFilterType } from "../../../../types/FiltersType";
import { useInventary } from "../../../../context/InventaryContext";

export const CodigoFilter = () => {
    const inv = useInventary();
    const [nameFilter, setNameFilter] = useState<CodigoFilterType>({ type:'CODIGO', filter:{ code:'' } });

    const HandleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const val = event.target.value;
        const nameAfter = {
            ...nameFilter,
            filter: { code:val }
        }
        setNameFilter(nameAfter);
        inv.updateFilter(nameAfter);
    }

    return (
        <div className='flex justify-center items-center gap-x-5 my-auto'>
            <h2 className='text-xl text-purple-900 font-bold '>Filtrar por Código</h2>
            
            <input 
                onChange={HandleChange} 
                className='py-2 px-5 text-black font-bold text-lg'
                placeholder='Codigo'
                />

        </div>
    );
}
