import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { 
    AllCreate, 
    Clasifications, 
    GroupsCompletedList, 
    ObjectCreate, 
    Quantity, 
    SecctionCompletedList, 
    States, 
    SubGroupsCompletedList
} from "../../../types/ObjectsGroupSub";
import { TextSubtitle, TextTitle } from "../DEFAULT/TextTypes";
import { BASIC_URL } from "../../../constants";
import { ReadyObject } from "./ReadyObject";
import { ObjNotification, useNotification } from "../../../context/NotificationContext";
import { DepList } from "../../../types/DepTypes";
import { useInventary } from "../../../context/InventaryContext";

const dataDefault: ObjectCreate = {
    name: '',
    description: '',
    estado: 'NUEVO',
    n_identification: '',
    price: 0,
    quantity: 0
}

const quantityDefault: Quantity = {
    fisica:0,
    contable:0,
}

const clf: Clasifications = JSON.parse(`${window.localStorage.getItem('obj_clasification')}`)
const clasificationDefault: Clasifications = {
    group_id: clf ? clf.group_id : 0,
    sub_group_id: clf ? clf.sub_group_id : 0,
    secction_id: clf ? clf.secction_id : 0,

}

type Range = 0|1|2|3|4;
type GSS = {
    group: GroupsCompletedList,
    sub_group: SubGroupsCompletedList,
    secction: SecctionCompletedList,
    dep: DepList
}

export const FormObjects = ({close}: {close: React.Dispatch<React.SetStateAction<boolean>>}) => {
    const inv = useInventary();
    const noti = useNotification();
    const obj_data: (ObjectCreate | null) = JSON.parse(`${window.localStorage.getItem('obj_data')}`);
    const obj_quantity: (Quantity | null) = JSON.parse(`${window.localStorage.getItem('obj_quantity')}`);
    const [data, setData] = useState<ObjectCreate>(obj_data ? obj_data :dataDefault);
    const [quantity, setQuantity] = useState<Quantity>(obj_quantity ? obj_quantity : quantityDefault);
    const [idGroup, setIdGroup] = useState<number>(0);
    const [idDep, setIdDep] = useState<number>( parseInt(`${window.localStorage.getItem('dep_id')}`) | 0 );
    const [clasification, setClasification] = useState<Clasifications>(clasificationDefault);
    const [groupSubSecction, setGroupSubSecction] = useState<GSS | null>(null);
    const [pag, setPag] = useState<Range>(0);
    const [validNext, setValidNext] = useState([false,false,false]);
    const [error, setError] = useState<{input:null | string, error: null | string}>({input:null, error:null})

    const hadleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data: ObjectCreate = JSON.parse(`${window.localStorage.getItem('obj_data')}`);
        const clasi: Clasifications = JSON.parse(`${window.localStorage.getItem('obj_clasification')}`);
        const quantity: Quantity = JSON.parse(`${window.localStorage.getItem('obj_quantity')}`);
        const dep: string = JSON.parse(`${window.localStorage.getItem('dep_id')}`);

        if(!data || !clasi || !quantity || !dep) return console.log('DANGER_GET_DATA_STORAGE')
        else {
            const SaveObjects = async () => {
                const token = `${window.localStorage.getItem('token')}`;
                const body: AllCreate = {
                    data: data,
                    clasification: clasi,
                    quantity: quantity,
                    dep: parseInt(dep)
                }
                const RequesOptions = {
                    "method": "POST",
                    "headers":{
                        "token":token,
                        "Content-Type":"application/json"
                    },
                    "body":JSON.stringify(body)
                };
                const url = `${BASIC_URL}/admin/objects`;
                const res = await fetch(url, RequesOptions);
                if(!res.ok) return;

                const json = await res.json();
                if(json.response == "SUCCESS_CREAte_OBJECTS") {
                    const newNoti: ObjNotification = {
                        type: 'SUCCESS',
                        notification: `Creado exitosamente`
                    }
                    noti.newNotification(newNoti);
                    noti.updateActive(true);

                    inv.updatePag(2);
                    //close(false);
                    window.localStorage.removeItem('obj_data');
                    window.localStorage.removeItem('obj_clasification');
                    window.localStorage.removeItem('obj_quantity');
                    if(false) close(true);
                }
            }
            SaveObjects();
        }
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newData = {
            ...data,
            [event.target.name]: event.target.value
        }
        setData(newData);
    }

    const handleChangeSelect = (event: ChangeEvent<HTMLSelectElement>) => {
        const newData = data;
        const val: States = event.target.value as States;
        newData.estado = val
        setData(newData);
    }

    const handleChangeQuantity = (event: ChangeEvent<HTMLInputElement>) => {
        if(event.target.name == 'contable') return 
        const newData = {
            ...quantity,
            fisica: parseInt(event.target.value),
            contable: data ? parseFloat(`${parseInt(event.target.value) * parseFloat(`${data.price}`)}`) : 0
        }
        setQuantity(newData);
    }

    const handleSelectionGroup = (event: ChangeEvent<HTMLSelectElement>) => {
        setIdGroup(parseInt(event.target.value));
        const newClas = clasification;
        newClas.group_id = parseInt(event.target.value);
        setClasification(newClas);
    }

    const handleSelectionClasification = (event: ChangeEvent<HTMLSelectElement>) => {
        const newSave = {
            ...clasification,
            [event.target.name]:event.target.value
        }
        setClasification(newSave);
    }

    const ValidNextPage = ({op,sum}:{op:number,sum:boolean}) => {
        let valid = validNext
        if(pag === 0) {
            if(!idDep) return setError({input:'dep', error:'Debes seleccionar una opción'})
            valid[0] = true;
        }
        if(pag === 1) {
            if(!data.description) return setError({input:'description', error:'Debes rellenar este campo'})
            if(!data.name) return setError({input:'name', error:'Debes rellenar este campo'})
            if(!data.n_identification) return setError({input:'n_identification', error:'Debes rellenar este campo'})
            if(!data.price) return setError({input:'price', error:'Debes rellenar este campo'})
            if(!data.estado) return setError({input:'estado', error:'Debes secelcionar una opción'})

            valid[1] = true
        }
        if(pag === 2) {
            if(!idGroup) return setError({input:'group', error:'Debes selecionar una opcion este campo'})
            if(!clasification.sub_group_id) return setError({input:'subgroup', error:'Debes selecionar una opcion este campo'})
            if(!clasification.secction_id) return setError({input:'section', error:'Debes selecionar una opcion este campo'})

            valid[2] = true
        }
        if(pag === 3) {
            if(!quantity.fisica) return setError({input:'fisica', error:'Debes completar este campo'})
            if(!quantity.contable) return setError({input:'contable', error:'Debes completar este campo'})


            valid[3] = true
        }
        if(pag === 4) valid[4] = true

        setValidNext(valid);
        UpdatePagination(op as Range, sum);
    }

    useEffect(()=>{
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
            const resDep = await fetch(`${BASIC_URL}/admin/dep`, RequesOptions);

            const jsonGroup = await resGroup.json();
            const jsonSubGroup = await resSubGroup.json();
            const jsonSecction = await resSecction.json();
            const jsonDep = await resDep.json();
            const AllDefined: GSS = {
                group: jsonGroup.body.groups,
                sub_group: jsonSubGroup.body.subGroupsAll,
                secction: jsonSecction.body.secctions,
                dep: jsonDep.body
            } 
            setGroupSubSecction(AllDefined);
        }
        const gss = JSON.parse(`${window.localStorage.getItem('gss')}`);
        if(!gss) getAll();
        else setGroupSubSecction(gss)
    }, []);

    const UpdatePagination = (p: Range, sum:boolean) => {
        if(p == 0) window.localStorage.setItem('dep_id', JSON.stringify(idDep));
        if(p == 1) window.localStorage.setItem('data', JSON.stringify(data));
        if(p == 2) window.localStorage.setItem('obj_clasification', JSON.stringify(clasification));
        if(p == 3) window.localStorage.setItem('obj_quantity', JSON.stringify(quantity));

        if(sum) return setPag(p+1 as Range);
        return setPag(p-1 as Range)
    }

    return (
        <form onSubmit={hadleSubmit}>
            <TextTitle text={pag == 3 ? 'Verificar Datos' : pag == 2 ? 'Seleccionar' : 'Crear'} />
            {
                pag == 0 
                ? <section className='grid gap-3 cgrid-cols-1 lg:grid-cols-2'>
                    <div className='grid col-span-2'>
                        <label>Departamento</label>
                        <select name='dep' className='py-3 text-lg text-center' onChange={(event) => {
                            console.log(event.target.value);
                            setIdDep(parseInt(`${event.target.value}`));
                            window.localStorage.setItem('dep_id', JSON.stringify(event.target.value));
                        }}>
                            <option value={idDep ? idDep : 0} selected>{idDep ? idDep : 'Selecciona una opción'}</option>
                            {
                                groupSubSecction?.dep.map(item => (
                                    <option className='font-bold' value={item.id} >{item.departament_name}</option>
                                ))
                            }
                        </select>
                        { error.input === 'dep' && <span className='bg-red-200 text-red-800 font-bold font-mono text-lg rounded-md p-2'>{error.error}</span> }

                    </div>
                </section>
                : pag == 1
                ? <section className='grid gap-3 grid-cols-1 lg:grid-cols-2'>
                    <div className='grid gapy-3'>
                        <label className='text-lg text-purple-900'>Código</label>
                        <input
                            onChange={handleChange} 
                            type='text' 
                            name='n_identification' 
                            value={data.n_identification}
                            placeholder="N° Identificación" 
                            className="focus:outline-none p-3 rounded-md bg-white text-gray-800 shadow text-mg font-bold" 
                            />
                        { error.input === 'n_identification' && <span className='bg-red-200 text-red-800 font-bold font-mono text-lg rounded-md p-2'>{error.error}</span> }
                    </div>
                    <div className='grid gapy-3'>
                        <label className='text-lg text-purple-900'>Nombre</label>
                        <input
                            onChange={handleChange} 
                            type='text' 
                            name='name'
                            value={data.name}
                            placeholder="Nombre" 
                            className="focus:outline-none p-3 rounded-md bg-white text-gray-800 shadow text-mg font-bold" 
                            />
                        { error.input === 'name' && <span className='bg-red-200 text-red-800 font-bold font-mono text-lg rounded-md p-2'>{error.error}</span> }

                    </div>
                    <div className='grid gapy-3'>
                        <label className='text-lg text-purple-900'>Descripción</label>
                        <input
                            onChange={handleChange} 
                            type='text' 
                            name='description'
                            value={data.description}
                            placeholder="Descripción" 
                            className="focus:outline-none p-3 rounded-md bg-white text-gray-800 shadow text-mg font-bold" 
                            />
                        { error.input === 'description' && <span className='bg-red-200 text-red-800 font-bold font-mono text-lg rounded-md p-2'>{error.error}</span> }

                    </div>
                    <div className='grid gapy-3'>
                        <label className='text-lg text-purple-900'>Costo</label>
                        <input
                            onChange={handleChange} 
                            type='number' 
                            name='price' 
                            value={data.price}
                            placeholder="Precio" 
                            className="focus:outline-none p-3 rounded-md bg-white text-gray-800 shadow text-mg font-bold" 
                            />
                        { error.input === 'price' && <span className='bg-red-200 text-red-800 font-bold font-mono text-lg rounded-md p-2'>{error.error}</span> }

                    </div>
                    <div className='grid gapy-3'>
                        <label className='text-lg text-purple-900'>Estado</label>
                        <select 
                            onChange={handleChangeSelect}
                            name='estado' 
                            placeholder="N° Identificación" 
                            className="focus:outline-none p-3 rounded-md bg-white text-gray-800 shadow text-mg font-bold" 
                        >
                            <option value='0' selected>Seleccione una opcion</option>
                            <option value='Nuevo'>Bueno</option>
                            <option value='Nuevo'>Regular</option>
                            <option value='Usado'>Dañado</option>
                        </select>
                        { error.input === 'estado' && <span className='bg-red-200 text-red-800 font-bold font-mono text-lg rounded-md p-2'>{error.error}</span> }

                    </div>
                </section>

                : pag == 3
                ? <section className='grid gap-3 grid-cols-1 lg:grid-cols-2'>
                    <div className='grid gap-y-3'>
                        <label className='text-lg text-purple-900'>Física</label>
                        <input
                            onChange={handleChangeQuantity} 
                            type='number' 
                            name='fisica' 
                            value={quantity.fisica}
                            placeholder="Física" 
                            className="focus:outline-none p-3 rounded-md bg-white text-gray-800 shadow text-mg font-bold" 
                            />
                        { error.input === 'fisica' && <span className='bg-red-200 text-red-800 font-bold font-mono text-lg rounded-md p-2'>{error.error}</span> }

                    </div>
                    <div className='grid gap-y-3'>
                        <label className='text-lg text-purple-900'>Contable</label>
                        <input
                            onChange={handleChangeQuantity} 
                            type='number' 
                            name='contable' 
                            value={quantity.contable}
                            placeholder="Contable" 
                            className="focus:outline-none p-3 rounded-md bg-white text-gray-800 shadow text-mg font-bold" 
                            />
                        { error.input === 'contable' && <span className='bg-red-200 text-red-800 font-bold font-mono text-lg rounded-md p-2'>{error.error}</span> }

                    </div>
                </section>
                : pag == 2
                ? <>
                    {
                        groupSubSecction !== null 
                        ? <section className='grid gap-y-4'>
                            <div className='bg-white shadow rounded-md p-3'>
                                <TextSubtitle text='Grupo' />
                                <select name='group' onChange={handleSelectionGroup} className='bg-transparent mt-3 text-md font-bold w-full'>
                                    <option value='0' selected>Seleccione una opcion</option>      
                                    {
                                        groupSubSecction.group && groupSubSecction.group.map((key) => (
                                            <option value={key.id} key={key.id}>{key.group}</option>
                                        ))
                                    }
                                </select>
                                { error.input === 'group' && <span className='bg-red-200 text-red-800 font-bold font-mono text-lg rounded-md p-2'>{error.error}</span> }

                            </div>
                            <div className='bg-white shadow rounded-md p-3'>
                                <TextSubtitle text='Sub Grupo' />
                                <select name='sub_group_id' onChange={handleSelectionClasification} className='bg-transparent mt-3 text-md font-bold w-full'>
                                    <option value='0' selected>Seleccione una opcion</option>
                                    {
                                        groupSubSecction.sub_group && groupSubSecction.sub_group.filter(i => i.group_id == idGroup).map((key) => (
                                            <option key={key.id} value={key.id}>{key.sub_group}</option>
                                        ))
                                    }
                                </select>
                                { error.input === 'subgroup' && <span className='bg-red-200 text-red-800 font-bold font-mono text-lg rounded-md p-2'>{error.error}</span> }

                            </div>
                            <div className='bg-white shadow rounded-md p-3'>
                                <TextSubtitle text='Sección' />
                                <select name='secction_id' onChange={handleSelectionClasification} className='bg-transparent mt-3 text-md font-bold w-full'>
                                    <option value='0' selected>Seleccione una opcion</option>   
                                    {
                                        groupSubSecction.secction && groupSubSecction.secction.map((key) => (
                                            <option key={key.id} value={key.id}>{key.secction}</option>
                                        ))
                                    }
                                </select>
                                { error.input === 'section' && <span className='bg-red-200 text-red-800 font-bold font-mono text-lg rounded-md p-2'>{error.error}</span> }

                            </div>
                        </section>
                        : <span>cargando...</span>
                    }
                </>
                : pag == 4 && data && clasification && quantity
                ? <ReadyObject />
                : <span>cargando...</span>
            }
            <div className='w-full flex justify-between items-center mt-5'>
                {
                    pag !== 0 
                    ? <button type='button' onClick={()=>ValidNextPage({op:pag, sum:false})} className='p-3 rounded-md text-center bg-purple-500 hover:bg-purple-600 font-bold text-white'>Anterior</button>
                    : <span></span>
                }
                {
                    pag !== 4
                    ? <button type='button' onClick={()=>ValidNextPage({op:pag, sum:true})} className='p-3 rounded-md text-center bg-purple-500 hover:bg-purple-600 font-bold text-white'>Siguiente</button>
                    : <input type='submit' className='py-3 px-10 rounded-md text-center bg-purple-700 hover:bg-purple-800 font-bold text-white' value='Crear' />
                }
            </div>
        </form>
    );
}