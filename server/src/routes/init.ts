import { Router,Request,Response } from 'express';
import { UserRegister } from '../interfaces/user.interface';
import { Groups } from '../interfaces/objects.interface'
import { Register } from '../services/auth.service';
import { PrismaClient } from '@prisma/client';

const router = Router();

const InsertUser: UserRegister[] = [
    {
        name:'Director',
        lastname:'Inventario',
        ci:'12345678',
        email:'direct.inventary@gmail.com',
        phone:'04161234567',
        password:'',
        role:'DIRECT',
        status:'ACTIVE'
    },
    {
        name:'Admin1',
        lastname:'Inventario',
        ci:'12345679',
        email:'admin1.inventary@gmail.com',
        phone:'04241234567',
        password:'',
        role:'ADMIN',
        status:'ACTIVE'
    },
    {
        name:'Admin2',
        lastname:'Inventario',
        ci:'23456789',
        email:'admin2.inventary@gmail.com',
        phone:'04121234567',
        password:'',
        role:'ADMIN',
        status:'ACTIVE'
    },
    {
        name:'Secretary1',
        lastname:'Inventario',
        ci:'11234567',
        email:'secretary1.inventary@gmail.com',
        phone:'04121534569',
        password:'',
        role:'SECRETARY',
        status:'ACTIVE'
    },
    {
        name:'Secretary2',
        lastname:'Inventario',
        ci:'11123456',
        email:'secretary2.inventary@gmail.com',
        phone:'04121234568',
        password:'',
        role:'SECRETARY',
        status:'ACTIVE'
    }
]

const InsertGroup: Groups[] = [
    {
        group: 'inmuebles'
    },
    {
        group: 'muebles'
    },
    {
        group: 'semovientes'
    },
    {
        group: 'vehiculos'
    }
]

router.get('/', async (req: Request, res: Response) => {
    
    const prisma = new PrismaClient();

    InsertUser[0].password = InsertUser[0].ci;
    InsertUser[1].password = InsertUser[0].ci;
    InsertUser[2].password = InsertUser[2].ci;
    InsertUser[3].password = InsertUser[3].ci;
    InsertUser[4].password = InsertUser[4].ci;

    const direct = await Register(InsertUser[0]);
    const admin1 = await Register(InsertUser[1]);
    const admin2 = await Register(InsertUser[2]);
    const secretary1 = await Register(InsertUser[3]);
    const secretary2 = await Register(InsertUser[4]);    

    const inmuebles = await prisma.groups.create({data:InsertGroup[0]});
    const muebles = await prisma.groups.create({data:InsertGroup[1]});
    const semovientes = await prisma.groups.create({data:InsertGroup[2]});
    const vehiculos = await prisma.groups.create({data:InsertGroup[3]});

    return res.send(`
        <h2>DIRECT / ADMIN / SECRETARY</h2> <br>
        <b>INSERT USER</b> => email:${direct.email} password:${direct.ci} <br>
        <b>INSERT USER</b> => email:${admin1.email} password:${admin1.ci} <br>
        <b>INSERT USER</b> => email:${admin2.email} password:${admin2.ci} <br>
        <b>INSERT USER</b> => email:${secretary1.email} password:${secretary1.ci} <br>
        <b>INSERT USER</b> => email:${secretary2.email} password:${secretary2.ci} <br>

        <h2>GROUP</h2> <br>
        <b>INSERT GROUP</b> => group: ${inmuebles.id} ${inmuebles.group} <br>
        <b>INSERT GROUP</b> => group: ${muebles.id} ${muebles.group} <br>
        <b>INSERT GROUP</b> => group: ${semovientes.id} ${semovientes.group} <br>
        <b>INSERT GROUP</b> => group: ${vehiculos.id} ${vehiculos.group} <br>
    `);
})

export { router };
