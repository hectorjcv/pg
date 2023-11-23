import React, { Dispatch, SetStateAction, useState } from 'react';
import { STATUS_USER, StateFilterAdmins, User } from '../../../types/DefaultTypes';
import { ParagraxBasic, TextSubtitle } from '../DEFAULT/TextTypes';
import { ButtonCB } from '../DEFAULT/ButtonBorder';
import { BASIC_URL } from '../../../constants';

interface Props {
    user: User,
    update: Dispatch<SetStateAction<StateFilterAdmins>>
}

export const ItemAdmin: React.FC<Props> = ({ user, update }) => {

    const [statusUser, setStatusUser] = useState<STATUS_USER>(user.status);

    const BloquedAdmin = (id:number) => {
        const BloquedAdminCb = async () => {
            const bodyIs = {id:id}
            const token = `${window.localStorage.getItem('token')}`;
            const RequestOptions = {
                method: 'PUT',
                headers: {
                    "Content-Type":"application/json",
                    token: `${token}`
                },
                body: JSON.stringify(bodyIs)
            }
            const res = await fetch(`${BASIC_URL}/direct/admin/bloqued`, RequestOptions);
            const response = await res.json();
            if(response.response === 'SUCCESS_BLOQUED_ADMIN') {
                update('ALL');
                setStatusUser('BLOQUED');
            }
        }
        BloquedAdminCb();
    }

    const DesbAdmin = (id:number) => {
        const DisBloquedAdminCb = async () => {
            const bodyIs = {id:id}
            const token = `${window.localStorage.getItem('token')}`;
            const RequestOptions = {
                method: 'PUT',
                headers: {
                    "Content-Type":"application/json",
                    token: `${token}`
                },
                body: JSON.stringify(bodyIs)
            }
            const res = await fetch(`${BASIC_URL}/direct/admin/disbloqued`, RequestOptions);
            const response = await res.json();
            if(response.response === 'SUCCESS_DISBLOQUED_ADMIN') {
                update('ALL');
                setStatusUser('ACTIVE');
            }
        }
        DisBloquedAdminCb();
    }

    const status = statusUser === 'ACTIVE' 
        ? 'Activo' 
        :  user.status === 'DISACTIVE'
        ? 'No activo'
        : 'Bloqueado'

    return (
        <li className='grid grid-cols-[.3fr_.3fr_1fr_1fr] gap-x-5 px-10 border-b border-purple-300 py-2'>
            <ParagraxBasic text={status} />
            <ParagraxBasic text={user.ci} />
            <TextSubtitle text={`${user.name} ${user.lastname}`} />
            <div className='grid grid-cols-2 gap-x-5'>
                {
                    statusUser === 'ACTIVE'
                    ? <ButtonCB color='red' text='Bloquear' cb={BloquedAdmin} id={user.id} />
                    : <ButtonCB color='blue' text='Desbloquear' cb={DesbAdmin} id={user.id} />
                }
                <ButtonCB color='purple' text='Ver' cb={DesbAdmin} id={user.id} />
            </div>
        </li>
    );
}
