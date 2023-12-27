import { ChangeEvent, useState } from "react";
import { ValorFilter as ValorFilterType } from "../../../../types/FiltersType";
import { useInventary } from "../../../../context/InventaryContext";

export const ValorFilter = () => {
    const inv = useInventary();
    const [valorFilter, setValorFilter] = useState<ValorFilterType>({ type:'VALOR', filter:{ min:0,max:0 } });

    const HandleChange = (event: ChangeEvent<HTMLInputElement>) => {
        if(!event.target.value) return
        const val = parseFloat(event.target.value);
        const name = event.target.name as 'min' | 'max';
        const valor = {...valorFilter}

        if(name === 'min') valor.filter.min = val
        if(name === 'max') valor.filter.max = val

        setValorFilter(valor);
        inv.updateFilter(valor);
    }

    return (
        <div className='flex justify-center items-center gap-x-5 my-auto'>
            <h2 className='text-xl text-purple-900 font-bold '>Filtrar por Valor</h2>
            
            <input 
                type='numbre'
                name='min'
                onChange={HandleChange} 
                className='py-2 px-5 text-black font-bold text-lg'
                placeholder='Min'
                />

            <input 
                type='number'
                name='max'
                onChange={HandleChange} 
                className='py-2 px-5 text-black font-bold text-lg'
                placeholder='Max'
                />

        </div>
    );
}
