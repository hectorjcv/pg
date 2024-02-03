import { ObjectCompleted } from "../../../types/ObjectsGroupSub";

export const ListBM3 = () => {

    const items: ObjectCompleted[] = JSON.parse(`${window.localStorage.getItem('export')}`);

    return (
        <>
            {
               items &&items.map(item => (
                <tr className='grid grid-cols-[repeat(20,5vw)] w-full'>
                    <td className='border col-span-4 grid grid-cols-3'>
                        <span className='col-span-3 border-b'>CODIGO</span>
                        <span className='border-r text-sm' contentEditable={true}>{item.clasification_reference?.group_id}</span>
                        <span className='border-r text-sm' contentEditable={true}>{item.clasification_reference?.sub_group_id}</span>
                        <span className='text-sm' contentEditable={true}>{item.clasification_reference?.secction_id}</span>
                    </td>
                    <td className='border col-span-2'>{item.n_identification}</td>
                    <td className='border col-span-8' contentEditable={true}>{item.name} {item.description}</td>
                    <td className='border col-span-2 grid grid-cols-2'>
                        <span className='col-span-3 border-b'>CANTIDAD</span>
                        <span className='border-r text-sm'>{item.quantity_reference?.fisica}</span>
                        <span className='text-sm'>{item.quantity_reference?.contable}</span>
                    </td>
                    <td className='border col-span-2'>{item.price}</td>
                    <td className='border col-span-2 grid grid-cols-2'>
                        <span className='col-span-3 border-b'>DIFERENCIA</span>
                        <span className='border-r text-sm' contentEditable={true}>.</span>
                        <span className='text-sm' contentEditable={true}>.</span>
                    </td>
                </tr>
                ))
            }
        </>
    );
}