import { ObjectCompleted } from "../../../types/ObjectsGroupSub";
import { ListBM1 } from "./ListBM1";


export const BodyBM1 = () => {

    const items: ObjectCompleted[] = JSON.parse(`${window.localStorage.getItem('export')}`);

    let subtotal = 0.00;

    let total = 0.00;

    for (let i = 0; i < items.length; i++) {
                
    }

    items.map(item => {
        subtotal += parseFloat(`${item.price}`);
        total += item.price*parseFloat(`${item.quantity_reference?.fisica}`);
    })

    return (
        <tbody className='w-full grid'>
            <tr className='grid grid-cols-12 w-full'>
                <td className='border text-[11px] border-gray-300 col-span-3 text-md text-center'>
                    CLASIFICACIÓN
                </td>
                <td className='border border-gray-300 col-span-1'></td>
                <td className='border border-gray-300 col-span-2'></td>
                <td className='border border-gray-300 col-span-3'></td>
                <td className='border border-gray-300 col-span-1'></td>
                <td className='border border-gray-300 col-span-1'></td>
                <td className='border border-gray-300 col-span-1'></td>
            </tr>
            <tr className='grid grid-cols-12 w-full'>
                <td className='border border-gray-300 col-span-3'>
                    <div className='grid grid-cols-3 w-full'>
                        <span className='text-center border-r-2 border-gray-300 text-[7px]'>GRUPO</span>
                        <span className='text-center border-r-2 border-gray-300 text-[7px]'>SUBGRUPO</span>
                        <span className='text-center border-gray-300 text-[7px]'>SECCIÓN</span>
                    </div>
                </td>
                <td className='border border-gray-300 text-[7px] col-span-1'>CANTIDAD</td>
                <td className='border border-gray-300 text-[7px] col-span-1'>N° DE IDENTIFICACIÓN</td>
                <td className='border border-gray-300 text-[7px] col-span-4'>NOMBRE Y DESCRIPCION DE LOS ELEMENTOS</td>
                <td className='border border-gray-300 text-[7px] col-span-1'>FECHA DE INCORPORACIÓN</td>
                <td className='border border-gray-300 text-[7px] col-span-1'>VALOR UNITARIO</td>
                <td className='border border-gray-300 text-[7px] col-span-1'>VALOR TOTAL</td>
            </tr>
            <ListBM1 />
            <tr className='grid grid-cols-12 w-full'>
                <td className='border border-gray-300 col-span-3'>
                    <div className='grid grid-cols-3 w-full'>
                        <span className='text-center border-r-2 border-gray-300'></span>
                        <span className='text-center border-r-2 border-gray-300'></span>
                        <span className='text-center border-gray-300'></span>
                    </div>
                </td>
                <td className='border border-gray-300 col-span-1'></td>
                <td className='border border-gray-300 col-span-2'></td>
                <td className='border border-gray-300 col-span-4 flex justify-end'>
                    <b className='pr-5 text-[11px]'>SUB TOTAL</b>
                </td>
                <td className='border border-gray-300 text-[11px] col-span-1'>{subtotal}</td>
                <td className='border border-gray-300 text-[11px] col-span-1'>{total}</td>
            </tr>
            <tr className='grid grid-cols-12 w-full'>
                <td className='border border-gray-300 col-span-3'>
                    <div className='grid grid-cols-3 w-full'>
                        <span className='text-center border-r-2 border-gray-300'></span>
                        <span className='text-center border-r-2 border-gray-300'></span>
                        <span className='text-center border-gray-300'></span>
                    </div>
                </td>
                <td className='border border-gray-300 col-span-1'></td>
                <td className='border border-gray-300 col-span-2'></td>
                <td className='border border-gray-300 col-span-4 flex justify-end'><b className='pr-5 text-[11px]'>TOTAL</b></td>
                <td className='border border-gray-300 col-span-1'></td>
                <td className='border border-gray-300 col-span-1'></td>
            </tr>
            <tr className='grid grid-cols-12 w-full'>
                <td className='border border-gray-300 col-span-4 grid place-items-center'>
                    <p className='font-bold text-gray-950 text-[12px]'>Elaborado por:</p>
                    <p className='text-[12px]'>Dirección de Bienes Municipales</p>
                </td>
                <td className='border border-gray-300 col-span-5'>
                    <p className='font-bold text-gray-950 text-[12px]'>Revisador por:</p>
                </td>
                <td className='border border-gray-300 col-span-3 py-10'>
                    <p className='font-bold text-gray-950 text-[12px]'>Responsable de unidad de trabajo:</p>
                </td>
            </tr>
        </tbody>
    );
}