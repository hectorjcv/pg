import { useEffect, useState } from "react";
import { TextSubtitle } from "../DEFAULT/TextTypes";
import { Clasifications, ObjectCreate, Quantity } from "../../../types/ObjectsGroupSub";

export const ReadyObject = () => {
    const data: ObjectCreate = JSON.parse(`${window.localStorage.getItem('obj_data')}`);
    const clasi: Clasifications = JSON.parse(`${window.localStorage.getItem('obj_clasification')}`);
    const quantity: Quantity = JSON.parse(`${window.localStorage.getItem('obj_quantity')}`);
    const dep: {id:string,dep:string} = JSON.parse(`${window.localStorage.getItem('dep_id')}`);

    const [ready, setReady] = useState(data && clasi && quantity ? true : false);
    
    useEffect(()=>{
        setReady(data && clasi && quantity ? true : false);
    },[])

    return (
        <>
        { ready && <div className='bg-purple-100 rounded-md pt-5'>

            <TextSubtitle text='Objeto para crear' />

            <div className='mt-3 px-5'>
                <TextSubtitle text='Clasificación' />
                <p className='grid grid-cols-1'>
                    <span>ID grupo: <b>{clasi.group_id}</b></span>
                    <span>ID sub grupo: <b>{clasi.sub_group_id}</b></span>
                    <span>ID sección: <b>{clasi.secction_id}</b></span>
                </p>
            </div>
            <div className='mt-3 p-5'>
                <TextSubtitle text='Datos' />
                <p className='grid grid-cols-2'>
                    <span>N° Identificación: <b>{data.n_identification}</b></span>
                    <span>Nombre: <b>{data.name}</b></span>
                    <span>Descripción: <b>{data.description}</b></span>
                    <span>Estado: <b>{data.estado}</b></span>                            
                    <span>Costo: <b>{data.price}</b></span>
                </p>
            </div>
            <div className='mt-3 p-5'>
                <TextSubtitle text='Cantidad' />
                <p className='grid grid-cols-2'>
                    <span>Física: <b>{quantity.fisica}</b></span>
                    <span>Valor: <b>{quantity.contable}</b></span>
                </p>
                <p>
                    <span>Ubicado en el departemento: <b>{dep.id}</b></span>
                </p>
            </div>
            
        </div>}
        </>
    )
}
