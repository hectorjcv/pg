

export const HeaderBM3 = () => {

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
                <td className='border-2 border-gray-800'>BM3</td>
            </tr>
            <tr className='grid grid-cols-[repeat(20,5vw)] w-full'>
                <td className='border'></td>
                <td className='border'></td>
                <td className='border'></td>
                <td className='border'></td>
                <td className='border col-span-12 text-2xl'>RELACIÓN DE BIENES MUEBLES FALTANTES</td>
                <td className='border'></td>
                <td className='border'></td>
                <td className='border'></td>
                <td className='border'></td>
            </tr>
            <tr className='grid grid-cols-[repeat(20,5vw)] w-full'>
                <td className='text-[11px]'>ENTIDAD</td>
                <td className='text-[11px]'>Estado</td>
                <td className='border-b col-span-9 border-gray-900'></td>
                <td className='border'></td>
                <td className='border'></td>
                <td className='border'></td>
                <td className='border border-gray-500 col-span-5 text-[11px]'>Identificación del Comprobante</td>
                <td className='border'></td>
            </tr>
            <tr className='grid grid-cols-[repeat(20,5vw)] w-full'>
                <td className=''></td>
                <td className='text-[11px]'>Distrito</td>
                <td className='border-b col-span-9 border-gray-900'></td>
                <td className='border'></td>
                <td className='border'></td>
                <td className='border'></td>
                <td className='border border-gray-500 col-span-3 text-[11px]'>Codigo Concepto Movimiento</td>
                <td className='border border-gray-500 col-span-2 text-[11px]'></td>
                <td className='border'></td>
            </tr>
            <tr className='grid grid-cols-[repeat(20,5vw)] w-full'>
                <td className='col-span-2 text-[11px]'>Unidad de trabajo</td>
                <td className='border-b col-span-9 border-gray-900 text-[11px]'></td>
                <td className='border'></td>
                <td className='border'></td>
                <td className='border'></td>
                <td className='border border-gray-500 col-span-3 text-[11px]'>Numero de Comprobante</td>
                <td className='border border-gray-500 col-span-2 text-[11px]'></td>
                <td className='border'></td>
            </tr>
            <tr className='grid grid-cols-[repeat(20,5vw)] w-full'>
                <td className='col-span-2 text-[11px]'>Ubicación administrativa</td>
                <td className='border-b col-span-9 border-gray-900'></td>
                <td className='border'></td>
                <td className='border'></td>
                <td className='border'></td>
                <td className='border border-gray-500 col-span-3 text-[11px]'>fecha de la operación</td>
                <td className='border border-gray-500 col-span-2 text-[11px]'></td>
                <td className='border'></td>
            </tr>
        </thead>
    );
}