import { ListBM3 } from "./ListBM";


export const BodyBM3 = () => {

    return (
        <tbody className='w-full grid'>
            
            <tr className='grid grid-cols-[repeat(20,5vw)] w-full'>
                <td className='border col-span-4 grid grid-cols-3'>
                    <span className='col-span-4 border-b'>CODIGO</span>
                    <span className='border-r text-sm'>GRUPO</span>
                    <span className='border-r text-sm'>SUBGRUPO</span>
                    <span className='text-sm'>SECCION</span>
                </td>
                <td className='border col-span-2'>Numero de identificacion</td>
                <td className='border col-span-8'>ESCRIPCION DE LOS BIENES</td>
                <td className='border col-span-2 grid grid-cols-2'>
                    <span className='col-span-4 border-b'>CANTIDAD</span>
                    <span className='border-r text-sm'>Exitencia fisica</span>
                    <span className='text-sm'>Registro contable</span>
                </td>
                <td className='border col-span-2'>VALOR UNITARIO</td>
                <td className='border col-span-2 grid grid-cols-2'>
                    <span className='col-span-4 border-b'>DIFERENCIA</span>
                    <span className='border-r text-sm'>Cantidad</span>
                    <span className='text-sm'>Valor total</span>
                </td>
            </tr>
            <ListBM3 />
            <tr className='grid grid-cols-[repeat(20,5vw)] w-full'>
                <td className='col-span-2'>Observaciones</td>
                <td className='border-b col-span-7 border-gray-900'></td>
                <td className='border'></td>
                <td className='border'></td>
                <td className='border'></td>
                <td className='col-span-5 border-b border-gray-400'>Faltantes determinadas por</td>
                <td className='border'></td>
            </tr>
            <tr className='grid grid-cols-[repeat(20,5vw)] w-full'>
                <td className='border-b col-span-9 border-gray-900'></td>
                <td className='border'></td>
                <td className='border'></td>
                <td className='border'></td>
                <td className='col-span-3 border-b border-gray-400'>Cargo que desempeña</td>
                <td className='col-span-4 border-b border-gray-900'></td>
                <td className='border'></td>
            </tr>
            <tr className='grid grid-cols-[repeat(20,5vw)] w-full'>
                <td className='border-b col-span-9 border-gray-900'></td>
                <td className='border'></td>
                <td className='border'></td>
                <td className='border'></td>
                <td className='col-span-3 border-b border-gray-400'>Dependencia a la cual esta adcrito</td>
                <td className='col-span-4 border-b border-gray-900'></td>
                <td className='border'></td>
            </tr>
            <tr className='grid grid-cols-[repeat(20,5vw)] w-full'>
                <td className='border-b col-span-9 border-gray-900'></td>
                <td className='border'></td>
                <td className='border'></td>
                <td className='border'></td>
                <td className='col-span-3 border-b border-gray-400'>firma</td>
                <td className='col-span-4 border-b border-gray-900'></td>
                <td className='border'></td>
            </tr>
            <tr className='grid grid-cols-[repeat(20,5vw)] w-full'>
                <td className='border-b col-span-9 border-gray-900'></td>
                <td className='border'></td>
                <td className='border'></td>
                <td className='border'></td>
                <td className='col-span-3 border-b border-gray-400'>Jefe de la Unidad de Trabajo</td>
                <td className='col-span-4 border-b border-gray-900'></td>
                <td className='border'></td>
            </tr>
            <tr className='grid grid-cols-[repeat(20,5vw)] w-full'>
                <td className='border-b col-span-9 border-gray-900'></td>
                <td className='border'></td>
                <td className='border'></td>
                <td className='border'></td>
                <td className='col-span-3 border-b border-gray-400'>firma</td>
                <td className='col-span-4 border-b border-gray-900'></td>
                <td className='border'></td>
            </tr>
        </tbody>
    );
}