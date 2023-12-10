import { useInventary } from "../../../context/InventaryContext";
import { TableObjects } from "../DEFAULT/TableObjects";
import { ParagraxBasic, TextTitle } from "../DEFAULT/TextTypes";

interface Props {}

export const Inventary: React.FC<Props> = () => {
    const inv = useInventary();

    return (
        <>
            <div>
                <TextTitle text='Inventario de bienes' />
                <ParagraxBasic text={`${inv.count} registros`} />
            </div>
            <div>
                <TableObjects />
            </div>
        </>
    );
}
