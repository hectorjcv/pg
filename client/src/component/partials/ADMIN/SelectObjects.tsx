import { useInventary } from "../../../context/InventaryContext";
import { TextTitle } from "../DEFAULT/TextTypes";

type PagInventary = 0 | 1 | 2
export const SelectObjects = () => {
    const inventary = useInventary();

    const setPage = (p: PagInventary) => inventary.updatePag(p);

    return (
        <section className='grid gap-y-5 m-auto w-[70%]'>
            <TextTitle text='Selecciona una opción' />

            <button
                onClick={()=>{ setPage(1) }}
                className='px-8 w-[50%] mx-auto max-h-[60px] font-bold rounded-lg py-3 border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white'
            >
                Crear
            </button>
            <button
                onClick={()=>{ setPage(2) }}
                className='px-8 w-[50%] mx-auto max-h-[60px] font-bold rounded-lg py-3 border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white'
            >
                Ver
            </button>
        </section>
    );
}