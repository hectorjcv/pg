import { RowNone } from "../TypesRows";

export const HeaderBM1 = () => {

    return (
        <thead className='w-full grid'>
            <RowNone />
            <tr className='grid grid-cols-12 w-full'>
                <td className='border'></td>
                <td className='border'></td>
                <td className='border'></td>
                <td className='border'></td>
                <td className='border'></td>
                <td className='border'></td>
                <td className='border'></td>
                <td className='border'></td>
                <td className='border'></td>
                <td className='border'></td>
                <td className='border'></td>
                <td className='border-2 border-gray-800'>FORMULARIO</td>
            </tr>
            <tr className='grid grid-cols-12 w-full'>
                <td className='border'></td>
                <td className='border'></td>
                <td className='border'></td>
                <td className='border'></td>
                <td className='border'></td>
                <td className='border'></td>
                <td className='border'></td>
                <td className='border'></td>
                <td className='border'></td>
                <td className='border'></td>
                <td className='border'></td>
                <td className='border-2 border-gray-800'>HOJA N° 1 DE 1</td>
            </tr>
            <tr className='grid grid-cols-12 w-full'>
                <td className='border-2 border-gray-800 col-span-3'>1.- ENTIDAD PROPIETARIA</td>
                <td className='border-2 border-gray-800 col-span-5'>ALCALDÍA MINUCIPIO JUAN GERMAN ROSCIO NIEVES</td>
                <td className='border-2 border-gray-800 col-span-1'>2.- SERVICIO</td>
                <td className='border-2 border-gray-800 col-span-3'></td>
            </tr>
            <RowNone />
            <tr className='grid grid-cols-12 w-full'>
                <td className='border-2 border-gray-800 col-span-3'>3.- UNIDAD</td>
                <td className='border-2 border-gray-800 col-span-3'></td>
                <td className='border-2 border-gray-800 col-span-1'>4.- ESTADO</td>
                <td className='border-2 border-gray-800 col-span-1'>GUÁRICO</td>
                <td className='border-2 border-gray-800 col-span-1'>5.- MUNICIPIO</td>
                <td className='border-2 border-gray-800 col-span-3'>JUAN GERMÁN ROSCIO NIEVES</td>
            </tr>
            <RowNone />
            <tr className='grid grid-cols-12 w-full'>
                <td className='border-2 border-gray-800 col-span-3'>7.- DIRECCIÓN O LUGAR</td>
                <td className='border-2 border-gray-800 col-span-5'>SAN JUAN DE LOS MORROS</td>
                <td className='border-2 border-gray-800 col-span-1'>8.- FECHA</td>
                <td className='border-2 border-gray-800 col-span-3'></td>
            </tr>
            <RowNone />
        </thead>
    );
}