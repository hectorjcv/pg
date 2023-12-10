import { useInventary } from "../../../context/InventaryContext";
import { FormObjects } from "./FormObjects";
import { ListObjects } from "./ListObjects";
import { SelectObjects } from "./SelectObjects";

export const SecctionInventary = ({close}: {close: React.Dispatch<React.SetStateAction<boolean>>}) => {
    const inventary = useInventary();

    return (
        <>
            {
                inventary.pag == 0
                ? <SelectObjects />
                : inventary.pag == 1
                ? <FormObjects  close={close} />
                : <ListObjects />
            }
        </>
    );
}