import { useEffect, useState } from "react";
import { ButtonBorder } from "../../component/partials/DEFAULT/ButtonBorder";
import { CardSingle } from "../../component/partials/DEFAULT/CardSingle";
import { ParagraxOpacity, TextSubtitle, TextTitle } from "../../component/partials/DEFAULT/TextTypes";
import { useAuth } from "../../context/AuthContext";
import { OnSession } from "../../hooks/useVerifySession";
import { GetUserStorage } from "../../service/UserService";
import { ModalBasic } from "../../component/partials/DEFAULT/ModalBasic";
import { SECTION_ADMIN, StateFilterAdmins, User } from "../../types/DefaultTypes";
import { FormCreateAdmin } from "../../component/partials/DIRECT/FormCreateAdmin";
import { ListAdmins } from "../../component/partials/DIRECT/ListAdmins";
import { BASIC_URL } from "../../constants";
import { RefreshToken } from "../../hooks/useRefrestToken";
import { DeleteStorage } from "../../service/DeleteStorage";
import { Inventary } from "../../component/partials/DIRECT/Inventary";
import { useNotification } from "../../context/NotificationContext";
import { Notification } from "../../component/partials/DEFAULT/Notification";

export const DashboardPage = () => {
    const noti = useNotification();
    const auth = useAuth();
    OnSession(auth.session);
    const user = GetUserStorage();
    const ROL = user.role === 'DIRECT' ? 'Director' : 'Administrador';

    const [modalAdmin, setModalAdmin] = useState(false);
    const [modalInventary, setModalInventary] = useState(false);
    const [adminSection, setAdminSection] = useState<SECTION_ADMIN>('');
    const [admins, setAdmins] = useState< User[] | null >(null);
    const [getAdminsState, setGetAdminsState] = useState<StateFilterAdmins>('ALL');
    const [updateAdmin, setUpdateAdmin] = useState(false);

    const After = () => {
        setGetAdminsState("ACTIVE");
        setGetAdminsState('ALL');
        setAdminSection('');
        setModalInventary(false);
        setUpdateAdmin(!updateAdmin);
    }

    const LogOut = (userId: number) => {
        const LogOutFn = async () => {
            const token = `${window.localStorage.getItem('token')}`;
            const res = await fetch(`${BASIC_URL}/auth/logout/${userId}`, {
                method: 'PUT',
                headers: {
                    "Content-Type":"application/json",
                    "token":token
                }
            });
            const response = await res.json();
            DeleteStorage();
            console.log(response);
        }
        LogOutFn();
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
            <ModalBasic closeModal={setModalAdmin} cb={After}>
                <div>
                    {
                        adminSection === ''
                        ?   <div className='mt-5 flex justify-center items-center flex-col'>
                                <TextSubtitle text={`¿Qué vamos a hacer?, ${user.ci}`} />
                                <button type='button' onClick={()=>{setAdminSection('ADMINISTRATION')}} className='w-full transition-colors text-xl font-bold font-mono text-center mt-5 py-4 border border-purple-600 text-purple-600 hover:text-purple-50 hover:bg-purple-600 rounded-xl'>Administrar</button>
                                <button type='button' onClick={()=>{setAdminSection('CREATE')}} className='w-full transition-colors text-xl font-bold font-mono text-center mt-5 py-4 border border-purple-600 text-purple-600 hover:text-purple-50 hover:bg-purple-600 rounded-xl'>Crear</button>
                            </div>
                        :   adminSection == 'CREATE'
                        ?   <FormCreateAdmin cb={After} close={setModalAdmin} />
                        :   <ListAdmins list={admins} update={setUpdateAdmin} />
                    }
                </div>
            </ModalBasic> 
        }

        {
            modalInventary && 
            <ModalBasic closeModal={setModalInventary} cb={After} w='w-[90%] lg:w-[60%]'>
                <Inventary />
            </ModalBasic> 
        }

        <div className='min-h-screen bg-purple-200 grid grid-rows-[auto_1fr]'>
            <header className='h-full'>
                <div className='w-full bg-purple-500 top-0 lg:h-[150px] pt-5 flex flex-col justify-center items-center'>
                    <h1 className='text-center text-white font-mono text-3xl'>
                        Bienvenido 
                        <span className='mx-2 font-extrabold text-purple-950'>
                            {user.ci}
                        </span>
                    </h1>
                    <h6 className='text-center text-purple-950 font-mono text-lg font-bold flex gap-x-5 items-center'>
                        {ROL}
                        <button
                            onClick={()=>LogOut(user.id)}
                            className='text-center bg-purple-600 hover:bg-purple-800 px-5 py-2 rounded-md font-mono text-lg font-bold mx-auto text-white'
                        >
                            Salir
                        </button>
                    </h6>
                    
                </div>
            </header>
            <main className='py-5 hidden lg:grid grid-cols-[2fr_1fr] w-full px-10 gap-5'>
                <div className='grid grid-cols-2 grid-rows-3 gap-5'>
                    <CardSingle>
                        <TextTitle text={`Administradores (${admins?.length})`} />
                        <ParagraxOpacity text='Crea, actualiza, bloquea, elimina administradores' />

                        <ButtonBorder cb={calbakModal}>
                            Administrar
                        </ButtonBorder>
                    </CardSingle>

                    <CardSingle>
                        <TextTitle text='Inventario' />
                        <ParagraxOpacity text='ver el inventario de los muebles, inmuebles y vehículos' />

                        <ButtonBorder cb={calbakModalInventary}>
                            Administrar
                        </ButtonBorder>
                    </CardSingle>

                    <CardSingle>
                        <TextTitle text='...' />

                    </CardSingle>

                    <CardSingle cls='row-span-3'>
                        <TextTitle text='...' />
                    </CardSingle>

                    <CardSingle>
                        <TextTitle text='...' />

                    </CardSingle>
                </div>
                <div className='grid grid-rows-1 pag-5'>
                    <CardSingle>
                            
                    </CardSingle>
                </div>
            </main>
        </div>
        </>
    );
}
