import { ObjectCompleted } from "../../../types/ObjectsGroupSub";

export const ListBM3 = () => {

    const items: ObjectCompleted[] = JSON.parse(`${window.localStorage.getItem('export')}`);

    return (
        <>
            {
               items &&items.map(item => (
                <tr className='grid grid-cols-[repeat(20,5vw)] w-full'>
                    <td className='border col-span-4 grid grid-cols-3'>
                        <span className='h-full border-r text-[9px]' contentEditable={true}>{item.clasification_reference?.group_reference.group}</span>
                        <span className='h-full border-r text-[9px]' contentEditable={true}>{item.clasification_reference?.sub_group_reference.sub_group}</span>
                        <span className='h-full text-[9px]' contentEditable={true}>{item.clasification_reference?.section_reference == undefined ? '' : item.clasification_reference?.section_reference.secction}</span>
                    </td>
                    <td className='border col-span-2 text-[9px]'>{item.n_identification}</td>
                    <td className='border col-span-8 text-[9px]' contentEditable={true}>{item.name} {item.description}</td>
                    <td className='border col-span-2 grid grid-cols-2'>
                        <span className='col-span-3 border-b text-[9px]'>CANTIDAD</span>
                        <span className='border-r text-[9px]'>{item.quantity_reference?.fisica}</span>
                        <span className='text-[9px]'>{item.quantity_reference?.contable}</span>
                    </td>
                    <td className='border col-span-2 text-[9px]'>{item.price}</td>
                    <td className='border col-span-2 grid grid-cols-2'>
                        <span className='col-span-3 border-b text-[9px]'>DIFERENCIA</span>
                        <span className='border-r text-[9px]' contentEditable={true}>.</span>
                        <span className='text-[9px]' contentEditable={true}>.</span>
                    </td>
                </tr>
                ))
            }
        </>
    );
}