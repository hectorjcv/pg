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

export const DashboardSecretary = () => {
    const noti = useNotification();
    const auth = useAuth();
    OnSession(auth.session);
    const [modalInventary, setModalInventary] = useState(false);
    const [modalDep, setModalDep] = useState(false);

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
                        <SecctionInventary close={setModalInventary} />
                    </ModalBasic> 
                </InventaryProvider>
            }

            {
                modalDep && 
                <ModalBasic closeModal={setModalDep} cb={afterDep} w='w-[90%] lg:w-[70%]'>
                    <SecctionDep />
                </ModalBasic> 
            }
        
        <div className='min-h-screen bg-purple-200 grid grid-rows-[auto_1fr]'>
            <Header />
            <main className='py-5 hidden lg:grid grid-cols-1fr w-full px-10 gap-5'>
                <div className='grid grid-cols-3 grid-rows-3 gap-5'>
                    <div className='row-span-4 grid gap-y-5'>
                        <CardSingle cls='row-span-5'>
                            <ListGroupSubSecc />
                        </CardSingle>
                        <CardSingle cls='row-span-2'>
                            <TextTitle text='Inventario' />
                            <ButtonBorder cb={()=>setModalInventary(true)} >Cargar</ButtonBorder>
                        </CardSingle>
                    </div>
                    
                    <div className='row-span-4 grid gap-y-5'>
                        <CardSingle>
                            <TextTitle text='Departamentos' />
                            <ButtonBorder cb={onModalDep}>
                                Crear
                            </ButtonBorder>
                        </CardSingle>

                        <CardSingle cls='row-span-2'>
                            <TextTitle text='Actualizar tu contraseña' />
                            <FormUpdatePassword />
                        </CardSingle>
                    </div>

                    <div className='row-span-4 grid gap-y-5'>
                        <CardSingle>
                            <span>.</span>
                        </CardSingle>
                    </div>

                </div>                
            </main>
        </div>
        </>
    );
}
