import { RowNone } from "../TypesRows";

export const HeaderBM2 = () => {

    return (
        <thead className='w-full grid'>
            <RowNone />
            <tr className='grid grid-cols-12 w-full'>
                <td className='border'></td>
                <td className='border'></td>
                <td className='border col-span-7 font-extralight text-4xl'>RELACION DEL MOVIMIENTO DE BIENES MUEBLES</td>
                <td className='border'></td>
                <td className='border'></td>
                <td className='border'></td>
            </tr>
            <tr className='grid grid-cols-12 w-full'>
                <td className='text-lg text-start font-extralight'>ESTADO</td>
                <td className='border-b pt-2 border-gray-900 col-span-7 text-lg font-semilight' contentEditable={true}></td>
                <td className='border'></td>
                <td className='border'></td>
                <td className='border'></td>
                <td className='border'></td>
            </tr>
            <tr className='grid grid-cols-12 w-full'>
                <td className='text-lg text-start font-extralight'>DISTRITO</td>
                <td className='border-b pt-2 border-gray-900 col-span-7 text-lg font-semilight' contentEditable={true}></td>
                <td className='border'></td>
                <td className='border'></td>
                <td className='border'></td>
                <td className='border'></td>
            </tr>
            <tr className='grid grid-cols-12 w-full'>
                <td className='text-lg text-start font-extralight'>MUNICIPIO</td>
                <td className='border-b pt-2 border-gray-900 col-span-7 text-lg font-semilight' contentEditable={true}></td>
                <td className='border'></td>
                <td className='border'></td>
                <td className='border'></td>
                <td className='border'></td>
            </tr>
            <tr className='grid grid-cols-12 w-full'>
                <td className='text-lg text-start font-extralight col-span-2'>DIRECCION O LUGAR</td>
                <td className='border-b pt-2 border-gray-900 col-span-6 text-lg font-semilight' contentEditable={true}></td>
                <td className='border'></td>
                <td className='border'></td>
                <td className='border'></td>
                <td className='border'></td>
            </tr>
            <tr className='grid grid-cols-12 w-full'>
                <td className='text-lg text-start font-extralight col-span-3'>DEPENDENCIA O UNIDAD PRIMARIA</td>
                <td className='border-b pt-2 border-gray-900 col-span-5 text-lg font-semilight' contentEditable={true}></td>
                <td className='text-lg text-start font-extralight'>SERVICIO</td>
                <td className='border-b pt-2 border-gray-900 col-span-3 text-lg font-semilight' contentEditable={true}></td>
            </tr>
            <tr className='grid grid-cols-12 w-full'>
                <td className='text-lg text-start font-extralight col-span-3'>UNIDAD DE TRABAJO O DEPENDENCIA</td>
                <td className='border-b pt-2 border-gray-900 col-span-9 text-lg font-semilight' contentEditable={true}></td>
            </tr>
            <tr className='grid grid-cols-12 w-full'>
                <td className='text-lg text-start font-extralight col-span-3'>PERIODO DE LA CUETA(mes año)</td>
                <td className='border-b pt-2 border-gray-900 col-span-9 text-lg font-semilight' contentEditable={true}></td>
            </tr>
            <tr className='grid grid-cols-12 w-full'>
                <td className='text-xl font-semibold pt-3 text-start col-span-12'>En el mes de la cuenta ha ocurrido el siguiente movimiento en los bienes a cargo de esta dependencia</td>
            </tr>
        </thead>
    );
}