import { Router,Request,Response } from 'express';
import { UserRegister } from '../interfaces/user.interface';
import { Register } from '../services/auth.service';

const router = Router();

const InsertUser: UserRegister[] = [
    {
        name:'Director Alcaldia',
        lastname:'Inventario',
        ci:'12345678',
        email:'luisangeles@gmail.com',
        phone:'04161234567',
        password:'',
        role:'DIRECT',
        status:'ACTIVE'
    }
]

router.get('/', async (req: Request, res: Response) => {
    InsertUser[0].password = InsertUser[0].ci;

    const direct = await Register(InsertUser[0]);   

    return res.send(`
        <h2>DIRECT / ADMIN / SECRETARY</h2> <br>
        <b>INSERT USER</b> => email:${direct.email} password:${direct.ci} <br>
    `);
})

export { router };
