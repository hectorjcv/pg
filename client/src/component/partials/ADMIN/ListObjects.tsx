import { ChangeEvent, useState } from "react";
import { useInventary } from "../../../context/InventaryContext";
import { TableObjects } from "../DEFAULT/TableObjects";
import { ParagraxBasic, TextTitle } from "../DEFAULT/TextTypes";
import { AllFilter } from "../DEFAULT/FILTERS/All";
import { DepartamentoFilter } from "../DEFAULT/FILTERS/Departamento";
import { CantidadFilter } from "../DEFAULT/FILTERS/Cantidad";
import { CodigoFilter } from "../DEFAULT/FILTERS/Codigo";
import { NombreFilter } from "../DEFAULT/FILTERS/Nombre";
import { ValorFilter } from "../DEFAULT/FILTERS/Valor";
import { SetFilters } from "../../../types/FiltersType";

export const ListObjects = () => {
    const inv = useInventary();
    const [filterSelected, setFilterSelected] = useState<SetFilters>('ALL');

    const HandleChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const val: SetFilters = event.target.value as SetFilters;
        setFilterSelected(val);
    }

    return (
        <>
            <div className='grid gap-y-4'>
                <aside className='flex justify-between items-center'>
                    <TextTitle text="Inventario" />
                    <ParagraxBasic text={`${inv.count} registros`} />
                </aside>
                <div className='rounded-xl bg-purple-300 mb-3 p-3 grid grid-cols-[400px_1fr] gap-x-10 h-[70px]'>
                    <select onChange={HandleChange} className='py-2 px-10 font-bold text-black text-lg rounded-md'>
                        <option selected value='ALL'>Todos</option>
                        <option value='DEPARTAMENTO'>Departamento</option>
                        <option value='NOMBRE'>Nombre</option>
                        <option value='CODIGO'>Código</option>
                        <option value='CANTIDAD'>Cantidad</option>
                    </select>
                    <div>
                        { filterSelected === 'ALL' && <AllFilter /> }
                        { filterSelected === 'DEPARTAMENTO' && <DepartamentoFilter /> }
                        { filterSelected === 'CANTIDAD' && <CantidadFilter /> }
                        { filterSelected === 'CODIGO' && <CodigoFilter /> }
                        { filterSelected === 'NOMBRE' && <NombreFilter /> }
                        { filterSelected === 'VALOR' && <ValorFilter /> }
                    </div>
                </div>
            </div>
            <TableObjects  />
        </>
    );
}