import { useInventary } from "../../../context/InventaryContext";
import { TableObjects } from "../DEFAULT/TableObjects";
import { ParagraxBasic, TextTitle } from "../DEFAULT/TextTypes";

export const ListObjects = () => {
    const inv = useInventary();

    return (
        <>
            <aside className='flex justify-between items-center'>
                <TextTitle text="Inventario" />
                <ParagraxBasic text={`${inv.count} registros`} />
            </aside>
            <TableObjects />
        </>
    );
}