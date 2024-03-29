
export interface UserRegister {
    name: string,
    lastname: string,
    ci: string,
    phone: string,
    email: string,
    password: string,
    role: ROLE,
    status: STATUS
}

export interface UserUpdate {
    name: string,
    lastname: string,
    ci: string,
    phone: string,
    email: string
}

export interface UserLogin {
    email:string,
    ci:string
}

export type ROLE = 'DIRECT' | 'ADMIN' | 'SECRETARY';

export type STATUS = 'ACTIVE' | 'DISACTIVE' | 'BLOQUED';
