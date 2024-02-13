import { FormObjects } from "./FormObjects";
import { ListObjects } from "./ListObjects";

export const SecctionInventary = ({close, pag}: {close: React.Dispatch<React.SetStateAction<boolean>>, pag:number}) => {

    return (
        <>
            {
                pag == 2
                ? <FormObjects  close={close} />
                : <ListObjects />
            }
        </>
    );
}