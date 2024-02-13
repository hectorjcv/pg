import { useState } from "react";
import { useInventary } from "../../../context/InventaryContext";
import { Navigate } from "../../../hooks/useNavigate";
import { ObjectCompleted } from "../../../types/ObjectsGroupSub";

export const SelectedOptions = () => {
    const inv = useInventary();
    const [open, setOpen] = useState(false);
    const [openOptions, setOpeOptions] = useState(false);

    const HandleClick = ({}) => {
        
        const all = inv.objects as ObjectCompleted[];

        window.localStorage.setItem('export', JSON.stringify(all));
        return inv.updateSelect({select:true, selected:all});
    }

    return (
        <div className='h-full relative grid grid-cols-2'>

            <div className='relative flex justify-center items-center'>
                <a href='#' onClick={()=>setOpeOptions(!openOptions)} className='bg-purple-500 hover:bg-purple-600 rounded-lg px-4 py-2 text-sm text-white font-bold'>opciones</a>
                {
                    openOptions &&
                    <div className={`absolute right-0 z-10 w-56 mt-4 top-6 bg-white border border-gray-100 rounded-md shadow-lg`}>
                        <span onClick={()=> { inv.updateSelect({ select: true, selected: []}) }} className='block px-4 py-2 text-sm text-gray-500 rounded-lg hover:bg-gray-50 hover:text-gray-700'>Seleccionar algunos</span>
                        <span onClick={HandleClick} className='block px-4 py-2 text-sm text-gray-500 rounded-lg hover:bg-gray-50 hover:text-gray-700'>Seleccionar todo</span>
                    </div>
                }
            </div> 
            <div className='relative flex justify-center items-center'>
                <span className='text-sm font-bold text-black px-3'>{inv.select.selected && inv.select.selected?.length > 0 ? 'exportar' : 'Formato vacío' }</span>
                <a href='#' onClick={()=>setOpen(!open)} className='bg-white rounded-lg px-4 py-2 text-sm text-gray-600 hover:text-gray-700'>formatos</a>
                {
                    open &&
                    <div className={`absolute right-0 z-10 w-56 mt-4 top-6 bg-white border border-gray-100 rounded-md shadow-lg`}>
                        <span onClick={()=> Navigate('/export/format/1')} className='block px-4 py-2 text-sm text-gray-500 rounded-lg hover:bg-gray-50 hover:text-gray-700'>Formato 1</span>
                        <span onClick={()=> Navigate('/export/format/2')} className='block px-4 py-2 text-sm text-gray-500 rounded-lg hover:bg-gray-50 hover:text-gray-700'>Formato 2</span>
                        <span onClick={()=> Navigate('/export/format/3')} className='block px-4 py-2 text-sm text-gray-500 rounded-lg hover:bg-gray-50 hover:text-gray-700'>Formato 3</span>
                    </div>
                }
            </div>  
            
        </div>
    );
}
