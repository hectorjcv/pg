export interface Activities {
    id: number,
    code: string,
    description:string,
    url: string,
    ci: string
}

export type ActivitiesList = Activities[];

export interface ActivitiesResponse {
    response: string,
    body: ActivitiesList
}
