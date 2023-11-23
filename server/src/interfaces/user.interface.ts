export interface UserRegister {
    name: string,
    lastname: string,
    ci: string,
    phone: string,
    email: string,
    role: ROLE,
    status: STATUS
}

export interface UserLogin {
    role:string,
    email:string,
    ci:string
}

export type ROLE = 'DIRECT' | 'ADMIN';

export type STATUS = 'ACTIVE' | 'DISACTIVE' | 'BLOQUED';
