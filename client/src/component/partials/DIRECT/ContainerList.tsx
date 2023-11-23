import React, { Dispatch, SetStateAction } from "react";
import { STATUS_USER, StateFilterAdmins, User } from "../../../types/DefaultTypes";
import { ItemAdmin } from "./ItemAdmin";
import { TextTitle } from "../DEFAULT/TextTypes";

interface Props {
    list: User[],
    update: Dispatch<SetStateAction<StateFilterAdmins>>
}

export const ContainerList: React.FC<Props> = ({ list, update }) => {

    return (
        <>
            <div className='flex items-center justify-between'>
                <TextTitle text="Administradores" />

                <select 
                    className='px-14 py-2 font-bold rounded-md text-purple-900'
                    onChange={(event)=>{
                        const stateS = event.target.value as STATUS_USER;
                        
                        const newState: StateFilterAdmins = stateS
                        update(newState)
                    }}
                    >
                    <option value="ALL">Todos</option>
                    <option value="ACTIVE">Activos</option>
                    <option value="BLOQUED">Bloqueados</option>
                </select>
            </div>
            <ul className='grid gap-y-4 py-4'>
                {
                    list.map((item) => <ItemAdmin key={item.id} user={item} update={update} />)
                }
            </ul>
        </>
    );
} 
