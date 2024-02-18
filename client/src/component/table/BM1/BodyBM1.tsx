import { ObjectCompleted } from "../../../types/ObjectsGroupSub";
import { ListBM1 } from "./ListBM1";


export const BodyBM1 = () => {

    const items: ObjectCompleted[] = JSON.parse(`${window.localStorage.getItem('export')}`);

    let acumulador = 0.00;

    for (let i = 0; i < items.length; i++) {
        const key = parseFloat(`${items[i].price}`);
        acumulador = key + acumulador;
    }


    return (
        <tbody className='w-full grid'>
            <tr className='grid grid-cols-12 w-full'>
                <td className='border-2 border-gray-300 col-span-3'>
                    CLASIFICACIÓN
                </td>
                <td className='border-2 border-gray-300 col-span-1'></td>
                <td className='border-2 border-gray-300 col-span-2'></td>
                <td className='border-2 border-gray-300 col-span-3'></td>
                <td className='border-2 border-gray-300 col-span-1'></td>
                <td className='border-2 border-gray-300 col-span-1'></td>
                <td className='border-2 border-gray-300 col-span-1'></td>
            </tr>
            <tr className='grid grid-cols-12 w-full'>
                <td className='border-2 border-gray-300 col-span-3'>
                    <div className='grid grid-cols-3 w-full'>
                        <span className='text-center border-r-2 border-gray-300'>GRUPO</span>
                        <span className='text-center border-r-2 border-gray-300'>SUBGRUPO</span>
                        <span className='text-center border-gray-300'>SECCIÓN</span>
                    </div>
                </td>
                <td className='border-2 border-gray-300 col-span-1'>CANTIDAD</td>
                <td className='border-2 border-gray-300 col-span-2'>NÚMERO DE IDENTIFICACIÓN</td>
                <td className='border-2 border-gray-300 col-span-3'>NOMBRE Y DESCRIPCION DE LOS ELEMENTOS</td>
                <td className='border-2 border-gray-300 col-span-1'>FECHA DE INCORPORACIÓN</td>
                <td className='border-2 border-gray-300 col-span-1'>VALOR UNITARIO</td>
                <td className='border-2 border-gray-300 col-span-1'>VALOR TOTAL</td>
            </tr>
            <ListBM1 />
            <tr className='grid grid-cols-12 w-full'>
                <td className='border-2 border-gray-300 col-span-3'>
                    <div className='grid grid-cols-3 w-full'>
                        <span className='text-center border-r-2 border-gray-300'></span>
                        <span className='text-center border-r-2 border-gray-300'></span>
                        <span className='text-center border-gray-300'></span>
                    </div>
                </td>
                <td className='border-2 border-gray-300 col-span-1'></td>
                <td className='border-2 border-gray-300 col-span-2'></td>
                <td className='border-2 border-gray-300 col-span-4 flex justify-end pr-11'><b className='pr-5'>SUB TOTAL</b> {acumulador}</td>
                <td className='border-2 border-gray-300 col-span-1'></td>
                <td className='border-2 border-gray-300 col-span-1'></td>
            </tr>
            <tr className='grid grid-cols-12 w-full'>
                <td className='border-2 border-gray-300 col-span-3'>
                    <div className='grid grid-cols-3 w-full'>
                        <span className='text-center border-r-2 border-gray-300'></span>
                        <span className='text-center border-r-2 border-gray-300'></span>
                        <span className='text-center border-gray-300'></span>
                    </div>
                </td>
                <td className='border-2 border-gray-300 col-span-1'></td>
                <td className='border-2 border-gray-300 col-span-2'></td>
                <td className='border-2 border-gray-300 col-span-4 flex justify-end pr-11'><b className='pr-5'>TOTAL</b> {acumulador}</td>
                <td className='border-2 border-gray-300 col-span-1'></td>
                <td className='border-2 border-gray-300 col-span-1'></td>
            </tr>
            <tr className='grid grid-cols-12 w-full'>
                <td className='border-2 border-gray-300 col-span-4 grid place-items-center'>
                    <p className='font-bold text-gray-950'>Elaborado por:</p>
                    <p className='only:'>Dirección de Bienes Municipales</p>
                </td>
                <td className='border-2 border-gray-300 col-span-5'>
                    <p className='font-bold text-gray-950'>Revisador por:</p>
                </td>
                <td className='border-2 border-gray-300 col-span-3 py-10'>
                    <p className='font-bold text-gray-950'>Responsable de unidad de trabajo:</p>
                </td>
            </tr>
        </tbody>
    );
}