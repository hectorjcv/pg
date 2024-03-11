import { CardSingle } from "../../component/partials/DEFAULT/CardSingle";
import { TextTitle } from "../../component/partials/DEFAULT/TextTypes";
import { useAuth } from "../../context/AuthContext";
import { OnSession } from "../../hooks/useVerifySession";
import { BASIC_URL } from "../../constants";
import { ButtonBorder } from "../../component/partials/DEFAULT/ButtonBorder";
import { useEffect, useState } from "react";
import { ModalBasic } from "../../component/partials/DEFAULT/ModalBasic";
import { SecctionInventary } from "../../component/partials/ADMIN/SecctionInventary";
import { InventaryProvider } from "../../context/InventaryContext";
import { GroupsCompletedList, SecctionCompletedList, SubGroupsCompletedList } from "../../types/ObjectsGroupSub";
import { useNotification } from "../../context/NotificationContext";
import { Notification } from "../../component/partials/DEFAULT/Notification";
import { FormUpdatePassword } from "../../component/partials/DEFAULT/FormUpdatePassword";
import { SecctionDep } from "../../component/partials/ADMIN/SecctionDep";
import { ListGroupSubSecc } from "../../component/partials/DIRECT/ListGroupSubSecc";
import { Header } from "../../component/partials/DEFAULT/Header";
import { SectionUpdateData } from "../../component/partials/DEFAULT/SectionUpdateUser";

export const DashboardSecretary = () => {
    const noti = useNotification();
    const auth = useAuth();
    OnSession(auth.session);
    const [modalInventary, setModalInventary] = useState(false);
    const [modalDep, setModalDep] = useState(false);
    const [passwordModal, setPasswordModal] = useState(false);
    const [pageInv, setPageInv] = useState(0);
    const [DataModal, setDataModal] = useState(false);

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

    const onModalDep = () => {
        setModalDep(true);
    }

    const afterInventary = () => {}
    
    const afterDep = () => {}

    return (
        <>
            { noti.active && <Notification /> }
            {
                modalInventary && 
                <InventaryProvider>
                    <ModalBasic h={'full'} closeModal={setModalInventary} cb={afterInventary} w='w-[90%]'>
                        <SecctionInventary pag={pageInv} close={setModalInventary} />
                    </ModalBasic> 
                </InventaryProvider>
            }

            {
                modalDep && 
                <ModalBasic closeModal={setModalDep} cb={afterDep} w='w-[90%] lg:w-[70%]'>
                    <SecctionDep />
                </ModalBasic> 
            }

            {
                passwordModal && 
                <ModalBasic closeModal={setPasswordModal} cb={afterDep} w='w-[90%] lg:w-[70%]'>
                    <>
                        <TextTitle text='Actualizar tu contraseña' />
                        <FormUpdatePassword />
                    </>
                </ModalBasic> 
            }

        {
            DataModal && 
            <ModalBasic closeModal={setDataModal} cb={()=>{}} w='w-[90%]'>
                <>
                    <TextTitle text='Actualizar Datos' />
                    <SectionUpdateData />
                </>
            </ModalBasic> 
        }
        
        <div className='min-h-screen bg-blue-200 grid grid-rows-[auto_1fr]'>
            <Header open={setPasswordModal} openData={setDataModal} />
            <main className='py-5 hidden lg:grid grid-cols-1fr w-full px-10 gap-5'>
                <div className='grid grid-cols-3 grid-rows-1 gap-5'>
                    <div className='row-span-1 grid gap-y-5'>
                        <CardSingle cls=''>
                            <ListGroupSubSecc />
                        </CardSingle>
                    </div>
                    
                    <div className='row-span-1 grid gap-y-5'>
                        <CardSingle cls='row-span-2'>
                            <div className='h-[250px] grid place-items-center m-auto'>
                                <TextTitle text='Departamentos' />
                                <div><ButtonBorder cb={onModalDep}>
                                    Crear
                                </ButtonBorder>
                                <p className='text-sm text-center font-light text-gray-500'>crear departamentos</p></div>
                            </div>
                        </CardSingle>
                    </div>

                    <div className='row-span-1 grid gap-y-5'>
                        <CardSingle cls='row-span-2'>
                            <div className='h-[250px] grid place-items-center m-auto'>
                                <TextTitle text='Inventario' />
                                <div className='grid place-items-center'>
                                    <ButtonBorder cb={()=>{
                                        setPageInv(1);
                                        setModalInventary(true);
                                    }}>
                                        Formatos
                                    </ButtonBorder>
                                    
                                    <p className='text-sm text-center font-light text-gray-500'>
                                        ve los bienes, buscar entre los bienes, descargar los formatos BM1, BM2, y BM3
                                    </p>
                                </div>

                                <div className='grid place-items-center'><ButtonBorder cb={()=>{
                                        setPageInv(2);
                                        setModalInventary(true);
                                    }}>
                                        crear
                                    </ButtonBorder>
                                    <p className='text-sm text-center font-light text-gray-500'>
                                        crear bienes
                                    </p>
                                </div>
                            </div>
                        </CardSingle>
                    </div>

                </div>                
            </main>
        </div>
        </>
    );
}
