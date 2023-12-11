import { PrismaClient } from '@prisma/client';
import { UserRegister, UserLogin } from '../interfaces/user.interface';
import { hash } from 'bcrypt';


const RegisterAdmin = async (user:UserRegister, id: number) => {
    const prisma = new PrismaClient();

    const IS_DIRECT = await prisma.people.findFirst({
        where: { id: parseInt(`${id}`) }
    });

    if (IS_DIRECT && IS_DIRECT.role !== 'DIRECT') throw new Error('DANGER_CREATE_ADMIN_NOT_IS_DIRECT');

    const ci = await prisma.people.findFirst({ where:{ci:user.ci} });
    if (ci) throw new Error('DANGER_CREATE_ADMIN_CI_EXITS');
    
    const email = await prisma.people.findFirst({ where:{email:user.email} });
    if (email) throw new Error('DANGER_CREATE_ADMIN_EMAIL_EXITS'); 

    const phone = await prisma.people.findFirst({ where:{phone:user.phone} });
    if (phone) throw new Error('DANGER_CREATE_ADMIN_PHONE_EXITS');

    const crp = await hash(user.ci, 11);
    const userRegister = await prisma.people.create({ 
        data:{
            name: user.name,
            lastname: user.lastname,
            ci: user.ci,
            password: crp,
            phone: user.phone,
            email: user.email,
            role: user.role,
            status: user.status
        }
    });

    return userRegister;
}

const GetAdmins = async (id: number) => {
    const prisma = new PrismaClient();

    const IS_DIRECT = await prisma.people.findFirst({
        where: { id: parseInt(`${id}`) }
    });
    if (IS_DIRECT && IS_DIRECT.role !== 'DIRECT') throw new Error('DANGER_CREATE_ADMIN_NOT_IS_DIRECT');

    const admins = await prisma.people.findMany({ where:{OR:[{role:'ADMIN'},{role:'SECRETARY'}]} });
    
    return admins;   
}

const DeleteAdmin = async (id: number, direct:number) => {
    const prisma = new PrismaClient();

    const IS_DIRECT = await prisma.people.findFirst({
        where: { id: parseInt(`${direct}`) }
    });

    if (IS_DIRECT && IS_DIRECT.role !== 'DIRECT') throw new Error('DANGER_CREATE_ADMIN_NOT_IS_DIRECT');

    const update = await prisma.people.delete({
        where: { id: parseInt(`${id}`) }
    })
    return update;
}

export { RegisterAdmin, GetAdmins, DeleteAdmin };