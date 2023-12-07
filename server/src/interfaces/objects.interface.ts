export interface ObjectCreate {
  name: string,
  description:string,
  price: number,
  quantity: number,
  n_identification: string,
  estado: States,
  creathe_by: number
}

/*
{
    name: string,
    description:string,
    price: number,
    quantity: number,
    n_identification: string,
    estado: States,
    creathe_by: number,
    imagen: string,
    quantity: {
        fisica: number,
        contable: number
    },
    clasification: {
        group_id: number,
        sub_group_id: number,
        secction_id: number
    }
}
*/

export type States = 'NUEVO' | 'USADO';

export interface Dates {
    creathe: string,
    update: string,
    delete: string
}

export interface Clasifications {
    group_id: number,
    sub_group_id: number,
    secction_id: number
}

export interface Groups {
    group: string
}

export interface SubGroups {
    sub_group: string
    group_id: number
}

export interface Secction {
    secction: string
}

export interface Quantity {
    fisica: number,
    contable: number
}

export interface ObjectCompleted {
    id: number,
    name: string,
    description:string,
    price: number,
    quantity: number,
    n_identification: string,
    estado: any,
    creathe_by: number,
    date_id: number,
    date_reference: Dates,
    clasification_id: number,
    clasification_reference: Clasifications,
    quantity_id: number,
    quantity_reference: Quantity
}

export type ObjectsCompletedList = ObjectCompleted[]; 
