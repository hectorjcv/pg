import { ObjectCompleted } from "../../../types/ObjectsGroupSub";

export const ListBM2 = () => {

    const items: ObjectCompleted[] = JSON.parse(`${window.localStorage.getItem('export')}`);

    return (
        <>
            {
               items &&items.map(item => (
                <tr className='grid grid-cols-[repeat(15,1fr)] w-full'>
                    <td className='grid grid-cols-2 p-0 col-span-2 w-full h-full'>
                        <td className='border text-[9px] border-gray-300 col-span-1 h-full'>{item.clasification_reference?.group_reference.group}</td>
                        <td className='border text-[9px] border-gray-300 col-span-1 h-full'>{item.clasification_reference?.sub_group_reference.sub_group}</td>
                    </td>
                    <td className='border text-[9px] border-gray-300 text-vertical col-span-1'>{item.clasification_reference?.section_reference == undefined ? '' : item.clasification_reference?.section_reference.secction}</td>
                    <td className='border text-[9px] border-gray-300 text-vertical col-span-1' contentEditable={true}></td>
                    <td className='border text-[9px] border-gray-300 text-vertical col-span-1' contentEditable={true}></td>
                    <td className='border text-[9px] border-gray-300 text-vertical col-span-1'>{item.n_identification}</td>
                    <td className='border text-[9px] border-gray-300 text-vertical col-span-6' contentEditable={true}>nombre: {item.name}, descripcion: {item.description}, precio:{item.price}</td>
                    <td className='border text-[9px] border-gray-300 text-vertical col-span-1' contentEditable={true}></td>
                    <td className='border text-[9px] border-gray-300 text-vertical col-span-2' contentEditable={true}></td>
                </tr>
                ))
            }
        </>
    );
}