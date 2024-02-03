import { useState } from "react";
import { useInventary } from "../../../context/InventaryContext";
import { Navigate } from "../../../hooks/useNavigate";

export const SelectedOptions = () => {
    const inv = useInventary();
    const [open, setOpen] = useState(false);

    return (
        <div className='h-full relative grid grid-cols-2'>
            {<button
                onClick={()=>inv.updateSelect({select:true,selected:[]})}
                className='w-[150px] h-full rounded-md bg-violet-600 hover:bg-violet-800 font-bold text-white'
            >
                {inv.select.select ? 'seleccionando' : 'seleccionar'}
            </button>}
            {
                inv.select.select && 
                <>
                    <div className='relative flex justify-center items-center'>
                        <span className='text-sm font-bold text-black px-3'>seleccionados: {inv.select.selected?.length}</span>
                        {inv.select.selected !== null && inv.select.selected.length > 1 && <a href='#' onClick={()=>setOpen(!open)} className='bg-white rounded-lg px-4 py-2 text-sm text-gray-600 hover:text-gray-700'>...</a>}
                        {
                            open &&
                            <div className={`absolute right-0 z-10 w-56 mt-4 top-6 bg-white border border-gray-100 rounded-md shadow-lg`}>
                                <span onClick={()=> Navigate('/export/format/1')} className='block px-4 py-2 text-sm text-gray-500 rounded-lg hover:bg-gray-50 hover:text-gray-700'>Formato 1</span>
                                <span onClick={()=> Navigate('/export/format/2')} className='block px-4 py-2 text-sm text-gray-500 rounded-lg hover:bg-gray-50 hover:text-gray-700'>Formato 2</span>
                                <span onClick={()=> Navigate('/export/format/3')} className='block px-4 py-2 text-sm text-gray-500 rounded-lg hover:bg-gray-50 hover:text-gray-700'>Formato 3</span>
                            </div>
                        }
                    </div>  
                </>
            }
            
        </div>
    );
}
