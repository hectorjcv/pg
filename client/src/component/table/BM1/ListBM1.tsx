import { ObjectCompleted } from "../../../types/ObjectsGroupSub";

export const ListBM1 = () => {

    const items: ObjectCompleted[] = JSON.parse(`${window.localStorage.getItem('export')}`);

    return (
        <>
            {
               items &&items.map(item => (
                    <tr className='grid grid-cols-12 w-full'>
                    <td className='border-2 border-gray-300 col-span-3'>
                        <div className='grid grid-cols-3 w-full'>
                            <span className='text-center border-r-2 border-gray-300'>{item.clasification_reference?.group_id}</span>
                            <span className='text-center border-r-2 border-gray-300'>{item.clasification_reference?.sub_group_id}</span>
                            <span className='text-center border-gray-300'>{item.clasification_reference?.secction_id}</span>
                        </div>
                    </td>
                    <td className='border-2 border-gray-300 col-span-1'>{item.quantity_reference?.fisica}</td>
                    <td className='border-2 border-gray-300 col-span-2'>{item.n_identification}</td>
                    <td className='border-2 border-gray-300 col-span-3'>{`${item.name} ${item.description}`}</td>
                    <td className='border-2 border-gray-300 col-span-1'>{item.date_reference?.creathe.split('T')[0]}</td>
                    <td className='border-2 border-gray-300 col-span-1'>{item.price}</td>
                    <td className='border-2 border-gray-300 col-span-1'>{item.price*parseInt(`${item.quantity_reference?.fisica}`)}</td>
                </tr>
                ))
            }
        </>
    );
}