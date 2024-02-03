import { ListBM2 } from "./ListBM";


export const BodyBM2 = () => {

    return (
        <tbody className='w-full grid'>
            <tr className='grid grid-cols-[repeat(15,6.66vw)] w-full'>
                <td className='border-2 border-gray-300 col-span-2'>
                    CLASIFICACIÓN
                </td>
                <td className='border-2 border-gray-300 col-span-1'></td>
                <td className='border-2 border-gray-300 col-span-1'></td>
                <td className='border-2 border-gray-300 col-span-1'></td>
                <td className='border-2 border-gray-300 col-span-1'></td>
                <td className='border-2 border-gray-300 col-span-6'></td>
                <td className='border-2 border-gray-300 col-span-1'></td>
                <td className='border-2 border-gray-300 col-span-2'></td>
            </tr>
            <tr className='grid grid-cols-[repeat(15,6.66vw)] w-full'>
                <td className='grid grid-cols-2 p-0 col-span-2 h-full'>
                    <td className='border-2 border-gray-300 col-span-1 h-full'>1</td>
                    <td className='border-2 border-gray-300 col-span-1 h-full'>2</td>
                </td>
                <td className='border-2 border-gray-300 text-vertical col-span-1 text-sm'>SECCION</td>
                <td className='border-2 border-gray-300 text-vertical col-span-1 text-sm'>CONCEPTO DE MOVIMIENTO</td>
                <td className='border-2 border-gray-300 text-vertical col-span-1 text-sm'>CANTIDAD</td>
                <td className='border-2 border-gray-300 text-vertical col-span-1 text-sm'>NUMERO DE IDENTIFICAIÓN</td>
                <td className='border-2 border-gray-300 text-vertical col-span-6 text-sm'>NOMBRE Y DESCRIPCION DE LOS BIENES, REFERENCIA DE LOS COMPROBANTES Y DE LOS PRECIOS UNITARIOS</td>
                <td className='border-2 border-gray-300 text-vertical col-span-1 text-sm'>INCORPORACIÓN</td>
                <td className='border-2 border-gray-300 text-vertical col-span-2 text-sm'>DESINCORPORACIÓN</td>
            </tr>
            <ListBM2 />
        </tbody>
    );
}