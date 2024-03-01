
export const HeaderBM2 = () => {

    return (
        <thead className='w-full grid'>
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
                <td className='pb-3 text-[8px] text-xs border-2 border-gray-800'>FORMULARIO</td>
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
                <td className='pb-3 text-[8px] text-xs border-2 border-gray-800'>BM2</td>
            </tr>
            <tr className='grid grid-cols-12 w-full'>
                <td className='border'></td>
                <td className='border'></td>
                <td contentEditable={true} className='text-xs border col-span-7 font-extralight text-2xl'>RELACION DEL MOVIMIENTO DE BIENES MUEBLES</td>
                <td className='border'></td>
                <td className='border'></td>
                <td className='border'></td>
            </tr>
            <tr className='grid grid-cols-12 w-full'>
                <td contentEditable={true} className='text-xs text-start font-extralight'>ESTADO</td>
                <td className='border-b pt-2 border-gray-900 col-span-7  font-semilight' contentEditable={true}></td>
                <td className='border'></td>
                <td className='border'></td>
                <td className='border'></td>
                <td className='border'></td>
            </tr>
            <tr className='grid grid-cols-12 w-full'>
                <td contentEditable={true} className='text-xs text-start font-extralight'>DISTRITO</td>
                <td className='border-b pt-2 border-gray-900 col-span-7 font-semilight' contentEditable={true}></td>
                <td className='border'></td>
                <td className='border'></td>
                <td className='border'></td>
                <td className='border'></td>
            </tr>
            <tr className='grid grid-cols-12 w-full'>
                <td contentEditable={true} className='text-xs text-start font-extralight'>MUNICIPIO</td>
                <td className='border-b pt-2 border-gray-900 col-span-7 font-semilight' contentEditable={true}></td>
                <td className='border'></td>
                <td className='border'></td>
                <td className='border'></td>
                <td className='border'></td>
            </tr>
            <tr className='grid grid-cols-12 w-full'>
                <td contentEditable={true} className='text-xs text-start font-extralight col-span-2'>DIRECCION O LUGAR</td>
                <td className='border-b pt-2 border-gray-900 col-span-6 font-semilight' contentEditable={true}></td>
                <td className='border'></td>
                <td className='border'></td>
                <td className='border'></td>
                <td className='border'></td>
            </tr>
            <tr className='grid grid-cols-12 w-full'>
                <td contentEditable={true} className='text-xs text-start font-extralight col-span-3'>DEPENDENCIA O UNIDAD PRIMARIA</td>
                <td className='border-b pt-2 border-gray-900 col-span-5 font-semilight' contentEditable={true}></td>
                <td className='text-start font-extralight'>SERVICIO</td>
                <td className='border-b pt-2 border-gray-900 col-span-3 font-semilight' contentEditable={true}></td>
            </tr>
            <tr className='grid grid-cols-12 w-full'>
                <td contentEditable={true} className='text-xs text-start font-extralight col-span-3'>UNIDAD DE TRABAJO O DEPENDENCIA</td>
                <td className='border-b pt-2 border-gray-900 col-span-9 font-semilight' contentEditable={true}></td>
            </tr>
            <tr className='grid grid-cols-12 w-full'>
                <td contentEditable={true} className='text-xs text-start font-extralight col-span-3'>PERIODO DE LA CUETA(mes año)</td>
                <td className='border-b pt-2 border-gray-900 col-span-9 font-semilight' contentEditable={true}></td>
            </tr>
            <tr className='grid grid-cols-12 w-full'>
                <td className='text-md font-semibold pt-3 text-start col-span-12'>En el mes de la cuenta ha ocurrido el siguiente movimiento en los bienes a cargo de esta dependencia</td>
            </tr>
        </thead>
    );
}