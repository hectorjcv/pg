import { useEffect, useState } from "react";
import { ButtonBorder } from "../../component/partials/DEFAULT/ButtonBorder";
import { CardSingle } from "../../component/partials/DEFAULT/CardSingle";
import { ParagraxOpacity, TextSubtitle, TextTitle } from "../../component/partials/DEFAULT/TextTypes";
import { useAuth } from "../../context/AuthContext";
import { OnSession } from "../../hooks/useVerifySession";
import { ModalBasic } from "../../component/partials/DEFAULT/ModalBasic";
import { SECTION_ADMIN, StateFilterAdmins, User } from "../../types/DefaultTypes";
import { FormCreateAdmin } from "../../component/partials/DIRECT/FormCreateAdmin";
import { ListAdmins } from "../../component/partials/DIRECT/ListAdmins";
import { BASIC_URL } from "../../constants";
import { RefreshToken } from "../../hooks/useRefrestToken";
import { Inventary } from "../../component/partials/DIRECT/Inventary";
import { useNotification } from "../../context/NotificationContext";
import { Notification } from "../../component/partials/DEFAULT/Notification";
import { FormUpdatePassword } from "../../component/partials/DEFAULT/FormUpdatePassword";
import { InventaryProvider } from "../../context/InventaryContext";
import { Header } from "../../component/partials/DEFAULT/Header";
import { ListGroupSubSecc } from "../../component/partials/DIRECT/ListGroupSubSecc";
import { SecctionDep } from "../../component/partials/ADMIN/SecctionDep";

export const DashboardPage = () => {
    const noti = useNotification();
    const auth = useAuth();
    OnSession(auth.session);

    const [modalDep, setModalDep] = useState(false);
    const [modalAdmin, setModalAdmin] = useState(false);
    const [modalInventary, setModalInventary] = useState(false);
    const [adminSection, setAdminSection] = useState<SECTION_ADMIN>('');
    const [admins, setAdmins] = useState< User[] | null >(null);
    const [getAdminsState, setGetAdminsState] = useState<StateFilterAdmins>('ALL');
    const [updateAdmin, setUpdateAdmin] = useState(false);
    const [passwordModal, setPasswordModal] = useState(false);

    const After = () => {
        setGetAdminsState("ACTIVE");
        setGetAdminsState('ALL');
        setAdminSection('');
        setModalInventary(false);
        setUpdateAdmin(!updateAdmin);
    }

    const onModalDep = () => {
        setModalDep(true);
    }

    const calbakModal = () => {
        setModalAdmin(true);
    }

    const calbakModalInventary = () => {
        setModalInventary(true);
    }

    useEffect(() => {
        const getAdmins = async () => {
            const cb = () => {
                setGetAdminsState('ALL');
            }
            RefreshToken({cb});
            const token = `${window.localStorage.getItem('token')}`;
            const RequestOptions = {
                headers: {
                    "Content-Type":"application/json",
                    token: `${token}`
                } 
            }
            const res = await fetch(`${BASIC_URL}/direct/admin`, RequestOptions);
            const response = await res.json();
            if (response.response === 'SUCCESS_GET_ALL_ADMIN') {
                console.log(response);
                const setting: User[] = response.body;

                const newState: User[] = setting;
                if (getAdminsState !== 'ALL') {
                    const list: number[] = [];
                    newState.map((key, i) => { if(key.status !== getAdminsState) list.push(i) });

                    list.reverse().map(key => newState.splice(key, 1));
                }                
                setAdmins(newState);
            }
        }
        getAdmins();
    }, [updateAdmin]);

    return (
        <>
        { noti.active && <Notification /> }
        {
            modalAdmin && 
            <ModalBasic closeModal={setModalAdmin} cb={After} w="w-[60%]">
                <div>
                    {
                        adminSection === ''
                        ?   <div className='mt-5 flex justify-center items-center flex-col w-full'>
                                <TextSubtitle text={`Director`} />
                                <button type='button' onClick={()=>{setAdminSection('ADMINISTRATION')}} className='w-full transition-colors text-xl font-bold font-mono text-center mt-5 py-4 border border-purple-600 text-purple-600 hover:text-purple-50 hover:bg-purple-600 rounded-xl'>Administrar</button>
                                <button type='button' onClick={()=>{setAdminSection('CREATE')}} className='w-full transition-colors text-xl font-bold font-mono text-center mt-5 py-4 border border-purple-600 text-purple-600 hover:text-purple-50 hover:bg-purple-600 rounded-xl'>Crear</button>
                            </div>
                        :   adminSection == 'CREATE'
                        ?   <FormCreateAdmin cb={After} close={setModalAdmin} />
                        :   <ListAdmins list={admins} update={After} />
                    }
                </div>
            </ModalBasic> 
        }

        {
            modalInventary && 
            <ModalBasic closeModal={setModalInventary} cb={After} w='w-[90%] lg:w-[60%]'>
                <InventaryProvider>
                    <Inventary />
                </InventaryProvider>
            </ModalBasic> 
        }

        {
            modalDep && 
            <ModalBasic closeModal={setModalDep} cb={()=>{}} w='w-[90%] lg:w-[70%]'>
                <SecctionDep />
            </ModalBasic> 
        }

        {
            passwordModal && 
            <ModalBasic closeModal={setPasswordModal} cb={()=>{}} w='w-[90%] lg:w-[70%]'>
                <TextTitle text='Actualizar tu contraseña' />
                <FormUpdatePassword />
            </ModalBasic> 
        }

        <div className='min-h-screen bg-purple-200 grid grid-rows-[auto_1fr]'>
            <Header open={setPasswordModal} />
            <main className='py-5 hidden lg:grid grid-cols-1 w-full px-10 gap-5'>
                <div className='grid grid-cols-3 gap-5'>
                    <div className='row-span-1 grid h-full gap-5'>
                        <CardSingle cls='row-span-3'>
                            <div className='h-[300px] m-auto'>
                                <TextTitle text={`Cuentas (${admins?.length})`} />
                                <ParagraxOpacity text='Crea, actualiza, bloquea, elimina administradores' />

                                <ButtonBorder cb={calbakModal}>
                                    Administrar
                                </ButtonBorder>
                            </div>
                        </CardSingle>
                    </div>

                    <div className='row-span-1 grid h-full gap-5'>
                        <CardSingle>
                            <TextTitle text='Inventario' />
                            <ParagraxOpacity text='ver el inventario de los muebles, inmuebles' />

                            <ButtonBorder cb={calbakModalInventary}>
                                Administrar
                            </ButtonBorder>
                        </CardSingle>

                        <CardSingle cls=''>
                            <ListGroupSubSecc />
                        </CardSingle>
                    </div>


                    <div className='row-span-1 grid h-full gap-5'>
                        <CardSingle cls='row-span-3'>
                            <div className='h-[300px] m-auto'>
                                <TextTitle text='Departamentos' />
                                <ButtonBorder cb={onModalDep}>
                                    Administrar
                                </ButtonBorder> 
                            </div>                       
                        </CardSingle>
                    </div>
                </div>
            </main>
        </div>
        </>
    );
}
