export interface Dep {
    departament_name: string
}

export interface DepId {
    id: number,
    departament_name: string
}

export type DepList = DepId[];

export interface ResponseGet {
    response: string,
    body: DepList
}
