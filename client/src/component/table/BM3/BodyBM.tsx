import { ListBM3 } from "./ListBM";


export const BodyBM3 = () => {

    return (
        <tbody className='w-full grid'>
            
            <tr className='grid grid-cols-[repeat(20,5vw)] w-full'>
                <td className='border col-span-4 grid grid-cols-3'>
                    <span className='col-span-4 text-[11px] border-b'>CODIGO</span>
                    <span className='border-r text-[11px] '>GRUPO</span>
                    <span className='border-r text-[11px] '>SUBGRUPO</span>
                    <span className='text-[11px]'>SECCION</span>
                </td>
                <td className='text-[11px] border col-span-2'>Numero de identificacion</td>
                <td className='text-[11px] border col-span-8'>ESCRIPCION DE LOS BIENES</td>
                <td className='text-[11px] border col-span-2 grid grid-cols-2'>
                    <span className='col-span-4 text-[11px] border-b'>CANTIDAD</span>
                    <span className='text-[8px] border-r '>Exitencia fisica</span>
                    <span className='text-[8px]'>Registro contable</span>
                </td>
                <td className='text-[11px] border col-span-2 text-center'>VALOR UNITARIO</td>
                <td className='text-[11px] border col-span-2 grid grid-cols-2'>
                    <span className='col-span-4 text-[11px] border-b'>DIFERENCIA</span>
                    <span className='text-[8px] border-r '>Cantidad</span>
                    <span className='text-[8px]'>Valor total</span>
                </td>
            </tr>
            <ListBM3 />
            <tr className='grid grid-cols-[repeat(20,5vw)] w-full'>
                <td className='col-span-2'>Observaciones</td>
                <td className='border-b col-span-7 border-gray-900'></td>
                <td className='border'></td>
                <td className='border'></td>
                <td className='border'></td>
                <td className='col-span-5 border-b border-gray-400 text-[11px]'>Faltantes determinadas por</td>
                <td className='border'></td>
            </tr>
            <tr className='grid grid-cols-[repeat(20,5vw)] w-full'>
                <td className='border-b col-span-9 border-gray-900'></td>
                <td className='border'></td>
                <td className='border'></td>
                <td className='border'></td>
                <td className='col-span-3 border-b border-gray-400 text-[11px]'>Cargo que desempeña</td>
                <td className='col-span-4 border-b border-gray-900'></td>
                <td className='border'></td>
            </tr>
            <tr className='grid grid-cols-[repeat(20,5vw)] w-full'>
                <td className='border-b col-span-9 border-gray-900'></td>
                <td className='border'></td>
                <td className='border'></td>
                <td className='border'></td>
                <td className='col-span-3 border-b border-gray-400 text-[11px]'>Dependencia a la cual esta adcrito</td>
                <td className='col-span-4 border-b border-gray-900'></td>
                <td className='border'></td>
            </tr>
            <tr className='grid grid-cols-[repeat(20,5vw)] w-full'>
                <td className='border-b col-span-9 border-gray-900'></td>
                <td className='border'></td>
                <td className='border'></td>
                <td className='border'></td>
                <td className='col-span-3 border-b border-gray-400 text-[11px]'>firma</td>
                <td className='col-span-4 border-b border-gray-900'></td>
                <td className='border'></td>
            </tr>
            <tr className='grid grid-cols-[repeat(20,5vw)] w-full'>
                <td className='border-b col-span-9 border-gray-900'></td>
                <td className='border'></td>
                <td className='border'></td>
                <td className='border'></td>
                <td className='col-span-3 border-b border-gray-400 text-[11px]'>Jefe de la Unidad de Trabajo</td>
                <td className='col-span-4 border-b border-gray-900'></td>
                <td className='border'></td>
            </tr>
            <tr className='grid grid-cols-[repeat(20,5vw)] w-full'>
                <td className='border-b col-span-9 border-gray-900'></td>
                <td className='border'></td>
                <td className='border'></td>
                <td className='border'></td>
                <td className='col-span-3 border-b border-gray-400 text-[11px]'>firma</td>
                <td className='col-span-4 border-b border-gray-900'></td>
                <td className='border'></td>
            </tr>
        </tbody>
    );
}