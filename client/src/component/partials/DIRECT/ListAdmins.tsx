import React, { Dispatch, SetStateAction } from "react";
import { StateFilterAdmins, User } from "../../../types/DefaultTypes";
import { ContainerList } from "./ContainerList";
import { ContainerNotList } from "./ContainerNotList";

interface Props {
    list: User[] | null,
    update: Dispatch<SetStateAction<StateFilterAdmins>>
}

export const ListAdmins: React.FC<Props> = ({ list, update }) => {

    return (
        <div>
            {
                list === null
                ? <ContainerNotList />
                : <ContainerList list={list} update={update} />
            }
        </div>
    );
}