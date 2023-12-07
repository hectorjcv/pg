import React, { Dispatch, SetStateAction } from "react";
import { STATUS_USER, StateFilterAdmins, User } from "../../../types/DefaultTypes";
import { ItemAdmin } from "./ItemAdmin";
import { TextTitle } from "../DEFAULT/TextTypes";

interface Props {
    list: User[],
    update: Dispatch<SetStateAction<boolean>>
}

export const ContainerList: React.FC<Props> = ({ list, update }) => {

    return (
        <>
            <div className='flex items-center justify-between'>
                <TextTitle text="Administradores" />
            </div>
            <ul className='grid gap-y-4 py-4'>
                {
                    list.map((item) => <ItemAdmin key={item.id} user={item} update={update} />)
                }
            </ul>
        </>
    );
} 
