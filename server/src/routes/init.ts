import { Router,Request,Response } from 'express'
import { PrismaClient } from '@prisma/client'
import { UserRegister } from '../interfaces/user.interface';
import { Register } from '../services/auth.service';

const router = Router();

router.get('/set/admin', async (req: Request, res: Response) => {
    const toSave: UserRegister = {
        name: 'Hector',
        lastname: 'Correa',
        ci: '29576735',
        email: 'hectorjesuscorreav@gmail.com',
        phone: '04243099591',
        role: 'DIRECT',
        status: 'ACTIVE',
    }
    const user = await Register(toSave);
    res.json(user);
})

export { router };
