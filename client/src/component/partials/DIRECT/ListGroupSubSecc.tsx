import { useState } from "react";
import { ButtonBorder } from "../DEFAULT/ButtonBorder"
import { TextTitle } from "../DEFAULT/TextTypes"
import { ModalBasic } from "../DEFAULT/ModalBasic";
import { SecctionGroup } from "../ADMIN/SecctionGroup";
import { SecctionSecction } from "../ADMIN/SecctionSecction";
import { SecctionSubGroup } from "../ADMIN/SecctionSubGroup";

import { GetUserStorage } from "../../../service/UserService";

export const ListGroupSubSecc = () => {
    const [modalGroup, setModalGroup] = useState(false);
    const [modalSubGroup, setModalSubGroup] = useState(false);
    const [modalSecctions, setModalSecctions] = useState(false);

    const user = GetUserStorage();

    return (
        <>
            {
            modalGroup && 
            <ModalBasic closeModal={setModalGroup} cb={()=>{}} w="w-[60%]">
                <SecctionGroup />
            </ModalBasic> 
            }
            {
            modalSubGroup && 
            <ModalBasic closeModal={setModalSubGroup} cb={()=>{}} w="w-[60%]">
                <SecctionSubGroup />
            </ModalBasic> 
            }
             {
            modalSecctions && 
            <ModalBasic closeModal={setModalSecctions} cb={()=>{}} w="w-[60%]">
                <SecctionSecction />
            </ModalBasic> 
            }
        
        <section className='grid grid-cols-1 gap-5 w-full'>
            <div className='grid grid-cols-2 place-items-center'>
                <TextTitle text='Grupos' />
                <div><ButtonBorder cb={()=>setModalGroup(true)}>
                    { user.role == 'SECRETARY' ? 'crear' : 'ver' }
                </ButtonBorder>
                <p className='text-sm text-center font-light text-gray-500'>
                    { user.role == 'SECRETARY' ? 'crear grupos' : 'ver grupos' }
                </p></div>
            </div>
            <div className='grid grid-cols-2 place-items-center'>
                <TextTitle text='Sub grupos' />
                <div><ButtonBorder cb={()=>setModalSubGroup(true)}>
                     { user.role == 'SECRETARY' ? 'crear' : 'ver' }
                </ButtonBorder>
                <p className='text-sm text-center font-light text-gray-500'>
                    { user.role == 'SECRETARY' ? 'crear sub grupos' : 'ver sub grupos' }
                </p></div>
            </div>
            <div className='grid grid-cols-2 place-items-center'>
                <TextTitle text='Secciones' />
                <div><ButtonBorder cb={()=>setModalSecctions(true)}>
                     { user.role == 'SECRETARY' ? 'crear' : 'ver' }
                </ButtonBorder>
                <p className='text-sm text-center font-light text-gray-500'>
                    { user.role == 'SECRETARY' ? 'crear secciones' : 'ver secciones' }
                </p></div>
            </div>
        </section>
        </>
    )
}