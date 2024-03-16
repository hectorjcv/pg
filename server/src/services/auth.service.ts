import { PrismaClient } from '@prisma/client';
import { UserRegister, UserLogin, UserUpdate } from '../interfaces/user.interface';
import { SECRET_KEY } from '../util/jwt'; 
// import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { compare, hash } from 'bcryptjs'
// import cookieParser from 'cookie-parser';

const Login = async (user:UserLogin) => {
    const prisma = new PrismaClient();
    
    const userFind = await prisma.people.findFirst({
        where:{ 
            email: user.email
        }
    });
    
    if(!userFind) throw new Error('DANGER_AUTH_LOGIN_VERIFY_DATA');

    if(!(userFind.email === user.email)) throw new Error('DANGER_AUTH_LOGIN_VERIFY_EMAIL');
    
    const match = await compare(user.ci, userFind.password);
    if(!match) throw new Error('DANGER_AUTH_LOGIN_VERIFY_DATA');

    await prisma.people.update({
        where: { id: userFind.id },
        data: { session: true }
    })

    const token = jwt.sign(
        { userid: userFind.id.toString() },
        SECRET_KEY,
        {
            expiresIn: '50000 days'
        }
    );
    return { user: userFind, token };
}

const RefresToken = async(userId:number) => {
    const prisma = new PrismaClient();
    const userFind = await prisma.people.findFirst({
        where:{ 
            id: userId,
            session: true
        }
    });
    
    if(!userFind) throw new Error('DANGER_AUTH_REFRESH_TOKEN_VERIFY_DATA');

    await prisma.people.update({
        where: { id: userFind.id },
        data: { session: true }
    })

    const token = jwt.sign(
        { userid: userFind.id.toString() },
        SECRET_KEY,
        {
            expiresIn: '1 days'
        }
    );
    return { token };
}

const Register = async (user:UserRegister) => {
    const prisma = new PrismaClient();
    const newUser: UserRegister = {
        name: user.name,
        lastname: user.lastname,
        ci: user.ci,
        phone: user.phone,
        email: user.email,
        password: user.ci,
        role: user.role,
        status: 'ACTIVE' 
    }
    newUser.password = await hash(newUser.password, 11);

    const userRegister = await prisma.people.create({ data:newUser });
    return userRegister;
}

const ClosedSession = async (id: number) => {
    const prisma = new PrismaClient();
    const date = new Date();
    const result = await prisma.people.update({
        where: { id:id },
        data: {
            session: false,
            last_session: date
        }
    });

    return result;
}

const UpdatePassword = async (password: string, id: number) => {
    const prisma = new PrismaClient();
    const crp = await hash(password, 11);
    const result = await prisma.people.update({
        where: { id:id },
        data: {
            password: crp
        }
    });

    return result;
}

const UpdateUser = async (data: UserUpdate, id: number) => {
    const prisma = new PrismaClient();


    const result = prisma.people.update({
        data: data,
        where: {id}
    })

    return result;

}

export { Login, Register, RefresToken, ClosedSession, UpdatePassword, UpdateUser };