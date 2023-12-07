import { CardSingle } from "../../component/partials/DEFAULT/CardSingle";
import { ParagraxOpacity, TextTitle } from "../../component/partials/DEFAULT/TextTypes";
import { useAuth } from "../../context/AuthContext";
import { OnSession } from "../../hooks/useVerifySession";
import { GetUserStorage } from "../../service/UserService";
import { BASIC_URL } from "../../constants";
import { DeleteStorage } from "../../service/DeleteStorage";
import { ButtonBorder } from "../../component/partials/DEFAULT/ButtonBorder";
import { useEffect, useState } from "react";
import { ModalBasic } from "../../component/partials/DEFAULT/ModalBasic";
import { SecctionSubGroup } from "../../component/partials/ADMIN/SecctionSubGroup";
import { SecctionGroup } from "../../component/partials/ADMIN/SecctionGroup";
import { SecctionSecction } from "../../component/partials/ADMIN/SecctionSecction";
import { SecctionInventary } from "../../component/partials/ADMIN/SecctionInventary";
import { InventaryProvider } from "../../context/InventaryContext";
import { GroupsCompletedList, SecctionCompletedList, SubGroupsCompletedList } from "../../types/ObjectsGroupSub";
import { useNotification } from "../../context/NotificationContext";
import { Notification } from "../../component/partials/DEFAULT/Notification";

export const DashBoardAdmin = () => {
    const noti = useNotification();
    const auth = useAuth();
    OnSession(auth.session);
    const user = GetUserStorage();
    const ROL = user.role === 'DIRECT' ? 'Director' : 'Administrador';

    const [modalGroup, setModalGroup] = useState(false);
    const [modalSubGroup, setModalSubGroup] = useState(false);
    const [modalSecction, setModalSecction] = useState(false);
    const [modalInventary, setModalInventary] = useState(false);

    useEffect(()=>{
        type GSS = {
            group: GroupsCompletedList,
            sub_group: SubGroupsCompletedList,
            secction: SecctionCompletedList
        }

        const getAll = async () => {
            const token = `${window.localStorage.getItem('token')}`
            const RequesOptions = {
                "method": "GET",
                "headers":{
                    "token":token,
                    "Content-Type":"application/json"
                }
            };

            const resGroup = await fetch(`${BASIC_URL}/admin/group`, RequesOptions);
            const resSubGroup = await fetch(`${BASIC_URL}/admin/subgroup`, RequesOptions);
            const resSecction = await fetch(`${BASIC_URL}/admin/secction`, RequesOptions);

            const jsonGroup = await resGroup.json();
            const jsonSubGroup = await resSubGroup.json();
            const jsonSecction = await resSecction.json();

            const AllDefined: GSS = {
                group: jsonGroup.body.groups,
                sub_group: jsonSubGroup.body.subGroups,
                secction: jsonSecction.body.secctions,
            } 
            console.log(AllDefined);
            window.localStorage.setItem('gss', JSON.stringify(AllDefined));
        }
        const gss: GSS = JSON.parse(`${window.localStorage.getItem('gss')}`);
        if(gss && gss.group.length == 0) getAll();
    },[])

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

    const onModalGroups = () => {
        setModalGroup(true);
    }

    const onModalSubGroups = () => {
        setModalSubGroup(true);
    }

    const onModalSecction = () => {
        setModalSecction(true);
    }

    const onModalInventary = () => {
        setModalInventary(true);
    }

    const afterGroup = () => {}

    const afterSubGroup = () => {}

    const afterSecction = () => {}

    const afterInventary = () => {}

    return (
        <>
            { noti.active && <Notification /> }
            {
                modalGroup && 
                <ModalBasic closeModal={setModalGroup} cb={afterGroup} w='w-[90%] lg:w-[60%]'>
                    <SecctionGroup />
                </ModalBasic> 
            }

            {
                modalSubGroup && 
                <ModalBasic closeModal={setModalSubGroup} cb={afterSubGroup} w='w-[90%] lg:w-[60%]'>
                    <SecctionSubGroup />
                </ModalBasic> 
            }

            {
                modalSecction && 
                <ModalBasic closeModal={setModalSecction} cb={afterSecction} w='w-[90%] lg:w-[60%]'>
                    <SecctionSecction />
                </ModalBasic> 
            }

{
                modalInventary && 
                <InventaryProvider>
                    <ModalBasic closeModal={setModalInventary} cb={afterInventary} w='w-[90%] lg:w-[60%]'>
                        <SecctionInventary />
                    </ModalBasic> 
                </InventaryProvider>
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
                    <div className='row-span-4 grid gap-y-5'>
                        <CardSingle>
                            <TextTitle text='Grupos' />
                            <ParagraxOpacity text='Crea, actualiza grupos' />

                            <ButtonBorder cb={onModalGroups}>
                                Administrar
                            </ButtonBorder>
                        </CardSingle>

                        <CardSingle>
                            <TextTitle text='Sub Grupos' />
                            <ParagraxOpacity text='Crea, actualiza sub grupos' />

                            <ButtonBorder cb={onModalSubGroups}>
                                Administrar
                            </ButtonBorder>
                        </CardSingle>

                        <CardSingle>
                            <TextTitle text='Secciones' />
                            <ParagraxOpacity text='Crea, actualiza sub secciones' />

                            <ButtonBorder cb={onModalSecction}>
                                Administrar
                            </ButtonBorder>
                        </CardSingle>
                    </div>
                    

                    <CardSingle>
                        <TextTitle text='Inventario' />

                        <ButtonBorder cb={onModalInventary}>
                            Administrar
                        </ButtonBorder>
                    </CardSingle>

                    

                    <CardSingle cls='row-span-3'>
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
