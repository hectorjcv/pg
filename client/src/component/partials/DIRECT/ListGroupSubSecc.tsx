import { useState } from "react";
import { ButtonBorder } from "../DEFAULT/ButtonBorder"
import { TextTitle } from "../DEFAULT/TextTypes"
import { ModalBasic } from "../DEFAULT/ModalBasic";
import { SecctionGroup } from "../ADMIN/SecctionGroup";
import { SecctionSecction } from "../ADMIN/SecctionSecction";
import { SecctionSubGroup } from "../ADMIN/SecctionSubGroup";

export const ListGroupSubSecc = () => {
    const [modalGroup, setModalGroup] = useState(false);
    const [modalSubGroup, setModalSubGroup] = useState(false);
    const [modalSecctions, setModalSecctions] = useState(false);



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
                <ButtonBorder cb={()=>setModalGroup(true)}>
                    Ver
                </ButtonBorder>
            </div>
            <div className='grid grid-cols-2 place-items-center'>
                <TextTitle text='Sub grupos' />
                <ButtonBorder cb={()=>setModalSubGroup(true)}>
                    Ver
                </ButtonBorder>
            </div>
            <div className='grid grid-cols-2 place-items-center'>
                <TextTitle text='Secciones' />
                <ButtonBorder cb={()=>setModalSecctions(true)}>
                    Ver
                </ButtonBorder>
            </div>
        </section>
        </>
    )
}