import { useState } from "react";
import { Notification } from "../../component/partials/DEFAULT/Notification";
import { useAuth } from "../../context/AuthContext"
import { useNotification } from "../../context/NotificationContext";
import { OnSession } from "../../hooks/useVerifySession";
import { ModalBasic } from "../../component/partials/DEFAULT/ModalBasic";
import { TextTitle } from "../../component/partials/DEFAULT/TextTypes";
import { InventaryProvider } from "../../context/InventaryContext";
import { Header } from "../../component/partials/DEFAULT/Header";
import { ButtonBorder } from "../../component/partials/DEFAULT/ButtonBorder";
import { CardSingle } from "../../component/partials/DEFAULT/CardSingle";
import { FormUpdatePassword } from "../../component/partials/DEFAULT/FormUpdatePassword";
import { SecctionDep } from "../../component/partials/ADMIN/SecctionDep";
import { ListGroupSubSecc } from "../../component/partials/DIRECT/ListGroupSubSecc";
import { SecctionInventary } from "../../component/partials/ADMIN/SecctionInventary";

export const DashboardAdmin = () => {
    const noti = useNotification();
    const auth = useAuth();
    OnSession(auth.session);

    const [modalInventary, setModalInventary] = useState(false);
    const [modalDep, setModalDep] = useState(false);
    const [updateAdmin, setUpdateAdmin] = useState(false);
    const [passwordModal, setPasswordModal] = useState(false);

    const After = () => {
        setModalInventary(false);
        setUpdateAdmin(!updateAdmin);
    }

    const onModalDep = () => {
        setModalDep(true);
    }

    return (
        <>
        { noti.active && <Notification /> }

        {
            modalDep && 
            <ModalBasic closeModal={setModalDep} cb={()=>{}} w='w-[90%] lg:w-[70%]'>
                <SecctionDep />
            </ModalBasic> 
        }

{
            modalInventary && 
            <ModalBasic closeModal={setModalInventary} cb={After} w='w-[90%]'>
                <InventaryProvider>
                    <SecctionInventary close={setModalInventary} pag={1} />
                </InventaryProvider>
            </ModalBasic> 
        }
        
        {
            passwordModal && 
            <ModalBasic closeModal={setPasswordModal} cb={After} w='w-[90%]'>
                <>
                    <TextTitle text='Actualizar tu contraseña' />
                    <FormUpdatePassword />
                </>
            </ModalBasic> 
        }

        <div className='min-h-screen bg-blue-200 grid grid-rows-[auto_1fr]'>
            <Header open={setPasswordModal} />
            <main className='py-5 grid grid-cols-3 w-full px-10 gap-5'>
                <div className='row-span-1 grid gap-y-5'>
                    <CardSingle cls=''>
                        <ListGroupSubSecc />
                    </CardSingle>
                </div>
                
                <div className='row-span-1 grid gap-y-5'>
                    <CardSingle cls='row-span-2'>
                        <div className='h-[250px] grid place-items-center m-auto'>
                            <TextTitle text='Departamentos' />
                            <div className='grid place-items-center'>
                                <ButtonBorder cb={onModalDep}>
                                    ver
                                </ButtonBorder>
                                <p className='text-sm text-center font-light text-gray-500'>ver lista de departamentos</p>
                            </div>
                        </div>
                    </CardSingle>
                </div>

                <div className='row-span-1 grid gap-y-5'>
                    <CardSingle cls='row-span-2'>
                        <div className='h-[250px] grid place-items-center m-auto'>
                            <TextTitle text='Inventario' />
                            <div className='grid place-items-center'>
                                <ButtonBorder cb={()=>setModalInventary(true)}>
                                    ver
                                </ButtonBorder>
                                <p className='text-sm text-center font-light text-gray-500'>ve los bienes, buscar entre los bienes, descargar los formatos BM1, BM2, y BM3</p>
                            </div>
                        </div>
                    </CardSingle>
                </div>
            </main>
        </div>
        </>
    );

}