
export type SetFilters = 'DEPARTAMENTO' | 'VALOR' | 'NOMBRE' | 'CODIGO' | 'CANTIDAD' | 'ALL'

export interface DepFilter {
    type: 'DEPARTAMENTO',
    filter: {
        dep_name: string
    }
}

export interface ValorFilter {
    type: 'VALOR',
    filter: {
        min: number,
        max: number
    }
}

export interface NombreFilter {
    type: 'NOMBRE',
    filter: {
        name: string
    }
    
}

export interface CodigoFilter {
    type: 'CODIGO',
    filter: {
        code: string
    }
}

export interface CantidadFilter {
    type: 'CANTIDAD',
    filter: {
        min: number,
        max: number
    }
}

export interface AllFilter {
    type: 'ALL',
    filter: null
}

export type GlobalFilter = 
    | DepFilter
    | ValorFilter
    | NombreFilter
    | CodigoFilter
    | CantidadFilter
    | AllFilter
