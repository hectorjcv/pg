import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useState } from "react"
import { ObjectsCompletedList } from "../types/ObjectsGroupSub";

type PagInventary = 0 | 1 | 2;

interface AuthContextInterface {
    pag: PagInventary,
    updatePag: Dispatch<SetStateAction<PagInventary>>,
    objects: ObjectsCompletedList | null,
    updateObjects: Dispatch<SetStateAction<ObjectsCompletedList | null>>,
}

const DefaultContext: AuthContextInterface = {
    pag: 0,
    updatePag: ()=>{},
    objects: null,
    updateObjects: ()=>{}
}

export const InventaryContext = createContext(DefaultContext);

export const InventaryProvider = ({children}: {children: ReactNode}) => {
    
    const [pag, setPage] = useState<PagInventary>(0)
    const [objects, setObjects] = useState<ObjectsCompletedList | null>(null)

    return (
        <InventaryContext.Provider value={{
            pag: pag,
            updatePag: setPage,
            objects: objects,
            updateObjects: setObjects
        }}>
            {children}
        </InventaryContext.Provider>
    )
}

export const useInventary = () => useContext(InventaryContext);
