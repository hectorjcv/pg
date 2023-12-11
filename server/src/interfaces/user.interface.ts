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

export interface UserLogin {
    role:string,
    email:string,
    ci:string
}

export type ROLE = 'DIRECT' | 'ADMIN' | 'SECRETARY';

export type STATUS = 'ACTIVE' | 'DISACTIVE' | 'BLOQUED';
