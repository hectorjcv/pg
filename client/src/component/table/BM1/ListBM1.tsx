import { ObjectCompleted } from "../../../types/ObjectsGroupSub";

export const ListBM1 = () => {

    const items: ObjectCompleted[] = JSON.parse(`${window.localStorage.getItem('export')}`);

    return (
        <>
            {
               items &&items.map(item => (
                    <tr className='grid grid-cols-12 w-full'>
                    <td contentEditable={true} className='border border-gray-300 col-span-3'>
                        <div contentEditable={true} className='grid grid-cols-3 w-full'>
                            <span contentEditable={true} className='text-center text-[7px] border-r border-gray-300'>{item.clasification_reference?.group_reference.group}</span>
                            <span contentEditable={true} className='text-center text-[7px] border-r border-gray-300'>{item.clasification_reference?.sub_group_reference.sub_group}</span>
                            <span contentEditable={true} className='text-center text-[7px] border-gray-300'>
                                {
                                    item.clasification_reference?.section_reference == undefined ? '' : item.clasification_reference?.section_reference.secction
                                }
                            </span>
                        </div>
                    </td>
                    <td contentEditable={true} className='border text-[7px] border-gray-300 col-span-1'>{item.quantity_reference?.fisica}</td>
                    <td contentEditable={true} className='border text-[7px] border-gray-300 col-span-1'>{item.n_identification}</td>
                    <td contentEditable={true} className='border text-[7px] border-gray-300 col-span-4'>{`${item.name} ${item.description}`}</td>
                    <td contentEditable={true} className='border text-[7px] border-gray-300 col-span-1'>{item.date_reference?.creathe.split('T')[0]}</td>
                    <td contentEditable={true} className='border text-[7px] border-gray-300 col-span-1'>{parseFloat(`${item.price}`).toFixed(2)}</td>
                    <td contentEditable={true} className='border text-[7px] border-gray-300 col-span-1'>{(item.price*parseFloat(`${item.quantity_reference?.fisica}`)).toFixed(2)}</td>
                </tr>
                ))
            }
        </>
    );
}