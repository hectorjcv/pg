import { DepId } from "./DepTypes";

export interface ObjectCreate {
    name: string,
    description:string,
    price: number,
    quantity: number,
    n_identification: string,
    estado: States,
}

export interface AllCreate {
    data: ObjectCreate,
    quantity: Quantity,
    clasification: Clasifications,
    dep: number,
    date: string
}

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
    id?: number,
    group: string
}

export interface SubGroups {
    id?: number,
    sub_group: string
    group_id: number
}

export interface Secction {
    id?: number,
    secction: string
}

export interface Quantity {
    fisica: number,
    contable: number
}

export interface GroupsCompleted {
    id: number,
    group: string
}

export interface SubGroupsCompleted {
    id: number,
    sub_group: string,
    group_id: number,
    group_reference: Groups
}

export interface SecctionCompleted {
    id: number,
    secction: string
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
    date_reference: Dates | undefined,
    clasification_id: number,
    clasification_reference: Clasifications | undefined,
    quantity_id: number,
    quantity_reference: Quantity | undefined,
    dep_id: number,
    dep_reference: DepId
}

export type ObjectsCompletedList = ObjectCompleted[]; 
export type GroupsCompletedList = GroupsCompleted[]; 
export type SubGroupsCompletedList = SubGroupsCompleted[]; 
export type SecctionCompletedList = SecctionCompleted[]; 

