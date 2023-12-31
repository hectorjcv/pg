import { useState } from "react";
import { Notification } from "../../component/partials/DEFAULT/Notification";
import { useAuth } from "../../context/AuthContext"
import { useNotification } from "../../context/NotificationContext";
import { OnSession } from "../../hooks/useVerifySession";
import { ModalBasic } from "../../component/partials/DEFAULT/ModalBasic";
import { ParagraxOpacity, TextTitle } from "../../component/partials/DEFAULT/TextTypes";
import { Inventary } from "../../component/partials/DIRECT/Inventary";
import { InventaryProvider } from "../../context/InventaryContext";
import { Header } from "../../component/partials/DEFAULT/Header";
import { ButtonBorder } from "../../component/partials/DEFAULT/ButtonBorder";
import { CardSingle } from "../../component/partials/DEFAULT/CardSingle";
import { FormUpdatePassword } from "../../component/partials/DEFAULT/FormUpdatePassword";
import { SecctionDep } from "../../component/partials/ADMIN/SecctionDep";
import { ListGroupSubSecc } from "../../component/partials/DIRECT/ListGroupSubSecc";

export const DashboardAdmin = () => {
    const noti = useNotification();
    const auth = useAuth();
    OnSession(auth.session);

    const [modalInventary, setModalInventary] = useState(false);
    const [modalDep, setModalDep] = useState(false);
    const [updateAdmin, setUpdateAdmin] = useState(false);

    const After = () => {
        setModalInventary(false);
        setUpdateAdmin(!updateAdmin);
    }

    const onModalDep = () => {
        setModalDep(true);
    }

    const calbakModalInventary = () => {
        setModalInventary(true);
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
                    <Inventary />
                </InventaryProvider>
            </ModalBasic> 
        }

        <div className='min-h-screen bg-purple-200 grid grid-rows-[auto_1fr]'>
            <Header />
            <main className='py-5 hidden lg:grid grid-cols-1 w-full px-10 gap-5'>
                <div className='grid grid-cols-3 grid-rows-3 gap-5'>
                    <CardSingle>
                        <TextTitle text='Inventario' />
                        <ParagraxOpacity text='ver el inventario de los muebles, inmuebles y vehículos' />

                        <ButtonBorder cb={calbakModalInventary}>
                            Administrar
                        </ButtonBorder>
                    </CardSingle>

                    <CardSingle>
                        <TextTitle text='Departamentos' />
                        <ButtonBorder cb={onModalDep}>
                            Administrar
                        </ButtonBorder>
                    </CardSingle>

                    <CardSingle cls='row-span-5'>
                        <span>.</span>
                    </CardSingle>

                    <CardSingle cls='row-span-4'>
                        <TextTitle text='Actualizar tu contraseña' />
                        <FormUpdatePassword />
                    </CardSingle>

                    <CardSingle cls='row-span-4'>
                        <ListGroupSubSecc />
                    </CardSingle>
                </div>
            </main>
        </div>
        </>
    );

}