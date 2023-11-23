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
    clasification: Clasifications
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
    group_id: number
}

export interface SecctionCompleted {
    id: number,
    secction: string
}

export interface ObjectCompleted {
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
    Clasification_reference: Clasifications,
    quantity_id: number,
    quantity_reference: Quantity
}

export type ObjectsCompletedList = ObjectCompleted[]; 
export type GroupsCompletedList = GroupsCompleted[]; 
export type SubGroupsCompletedList = SubGroupsCompleted[]; 
export type SecctionCompletedList = SecctionCompleted[]; 

