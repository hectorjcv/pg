import React, { Dispatch, SetStateAction, useState } from 'react';
import { STATUS_USER, StateFilterAdmins, User } from '../../../types/DefaultTypes';
import { ParagraxBasic, TextSubtitle } from '../DEFAULT/TextTypes';
import { ButtonCB } from '../DEFAULT/ButtonBorder';
import { BASIC_URL } from '../../../constants';

interface Props {
    user: User,
    update: Dispatch<SetStateAction<boolean>>
}

export const ItemAdmin: React.FC<Props> = ({ user, update }) => {

    const Delete = (id:number) => {
        const DeleteCb = async () => {
            const bodyIs = {id:id}
            const token = `${window.localStorage.getItem('token')}`;
            const RequestOptions = {
                method: 'DELETE',
                headers: {
                    "Content-Type":"application/json",
                    token: `${token}`
                },
                body: JSON.stringify(bodyIs)
            }
            const res = await fetch(`${BASIC_URL}/direct/admin/delete`, RequestOptions);
            const response = await res.json();
            if(response.response === 'SUCCESS_BLOQUED_ADMIN') {
                // NOTIFICATION
                update(true);
            }
        }
        DeleteCb();
    }

    return (
        <li className='grid grid-cols-[.3fr_.3fr_1fr_1fr] gap-x-5 px-10 border-b border-purple-300 py-2'>
            <ParagraxBasic text={status} />
            <ParagraxBasic text={user.ci} />
            <TextSubtitle text={`${user.name} ${user.lastname}`} />
            <div className='grid grid-cols-2 gap-x-5'>
                <ButtonCB color='red' text='Eliminar' cb={Delete} id={user.id} />
                <ButtonCB color='purple' text='Ver' cb={ ()=>{console.log('ver')} } id={user.id} />
            </div>
        </li>
    );
}
