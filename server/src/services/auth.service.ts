import { PrismaClient } from '@prisma/client';
import { UserRegister, UserLogin } from '../interfaces/user.interface';
import { SECRET_KEY } from '../util/jwt'; 
// import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
// import cookieParser from 'cookie-parser';

const Login = async (user:UserLogin) => {
    const prisma = new PrismaClient();
    
    const userFind = await prisma.people.findFirst({
        where:{ 
            ci: user.ci
        }
    });
    
    if(!userFind) throw new Error('DANGER_AUTH_LOGIN_VERIFY_DATA');

    if(!(userFind.email === user.email)) throw new Error('DANGER_AUTH_LOGIN_VERIFY_EMAIL');
    if(!(userFind.ci === user.ci)) throw new Error('DANGER_AUTH_LOGIN_VERIFY_CI');
    
    // const match = await bcrypt.compare(user.password, userFind.password);
    // if(!match) throw new Error('DANGER_AUTH_LOGIN_VERIFY_DATA');

    await prisma.people.update({
        where: { id: userFind.id },
        data: { session: true }
    })

    const token = jwt.sign(
        { userid: userFind.id.toString() },
        SECRET_KEY,
        {
            expiresIn: '500 days'
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
        role: 'DIRECT',
        status: 'ACTIVE' 
    }
    // newUser.password = await bcrypt.hash(newUser.password, 11);

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

export { Login, Register, RefresToken, ClosedSession };