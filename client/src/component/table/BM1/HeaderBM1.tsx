import { RowNone } from "../TypesRows";

export const HeaderBM1 = () => {

    const date = new Date();

    return (
        <thead className='w-full grid'>
            <tr className='grid grid-cols-12 w-full'>
                <td className='pb-1 border'></td>
                <td className='pb-1 border'></td>
                <td className='pb-1 border'></td>
                <td className='pb-1 border'></td>
                <td className='pb-1 border'></td>
                <td className='pb-1 border'></td>
                <td className='pb-1 border'></td>
                <td className='pb-1 border'></td>
                <td className='pb-1 border'></td>
                <td className='pb-1 border'></td>
                <td className='pb-1 border'></td>
                <td className='pb-1 border border-gray-800'>FORMULARIO</td>
            </tr>
            <tr className='grid grid-cols-12 w-full'>
                <td className='pb-1 border'></td>
                <td className='pb-1 border'></td>
                <td className='pb-1 border'></td>
                <td className='pb-1 border'></td>
                <td className='pb-1 border'></td>
                <td className='pb-1 border'></td>
                <td className='pb-1 border'></td>
                <td className='pb-1 border'></td>
                <td className='pb-1 border'></td>
                <td className='pb-1 border'></td>
                <td className='pb-1 border'></td>
                <td className='pb-1 border border-gray-800'>BM1</td>
            </tr>
            <tr className='grid grid-cols-12 w-full'>
                <td contentEditable={true} className='pb-1 text-[12px] border border-gray-800 col-span-3'>1.- ENTIDAD PROPIETARIA</td>
                <td contentEditable={true} className='pb-1 text-[12px] border border-gray-800 col-span-5'>ALCALDÍA MINUCIPIO JUAN GERMAN ROSCIO NIEVES</td>
                <td contentEditable={true} className='pb-1 text-[12px] border border-gray-800 col-span-1'>2.- SERVICIO</td>
                <td className='pb-1 border border-gray-800 col-span-3'></td>
            </tr>
            <RowNone />
            <tr className='grid grid-cols-12 w-full'>
                <td contentEditable={true} className='pb-1 text-[12px] border border-gray-800 col-span-3'>3.- UNIDAD</td>
                <td contentEditable={true} className='pb-1 text-[12px] border border-gray-800 col-span-3'></td>
                <td contentEditable={true} className='pb-1 text-[12px] border border-gray-800 col-span-1'>4.- ESTADO</td>
                <td contentEditable={true} className='pb-1 text-[12px] border border-gray-800 col-span-1'>GUÁRICO</td>
                <td contentEditable={true} className='pb-1 text-[12px] border border-gray-800 col-span-1'>5.- MUNICIPIO</td>
                <td contentEditable={true} className='pb-1 text-[12px] border border-gray-800 col-span-3'>JUAN GERMÁN ROSCIO NIEVES</td>
            </tr>
            <RowNone />
            <tr className='grid grid-cols-12 w-full'>
                <td contentEditable={true} className='pb-1 text-[12px] border border-gray-800 col-span-3'>6.- DIRECCIÓN O LUGAR</td>
                <td contentEditable={true} className='pb-1 text-[12px] border border-gray-800 col-span-5'>SAN JUAN DE LOS MORROS</td>
                <td contentEditable={true} className='pb-1 text-[12px] border border-gray-800 col-span-1'>7.- FECHA</td>
                <td className='pb-1 text-[12px] border border-gray-800 col-span-3'>
                    {`${date.getDate()} - ${date.getUTCDate()+1} - ${date.getFullYear()}`}
                </td>
            </tr>
            <RowNone />
        </thead>
    );
}