import { Request, Response } from 'express';
import { handleHTTP } from '../util/error.handle';
import { Login, Register, RefresToken, ClosedSession, UpdatePassword } from '../services/auth.service';
import { UserLogin, UserRegister } from '../interfaces/user.interface';
import { RequestExtend } from '../interfaces/jwt.interface';

const controllerRegister = async ({body}: RequestExtend, res:Response) => {
    try {
        const objRegister: UserRegister = {
            name: body.name,
            lastname: body.lastname,
            ci: body.ci,
            phone: body.phone,
            email: body.email,
            role: 'DIRECT',
            password: body.ci,
            status: 'ACTIVE'        
        }
        const responseRegister = await Register(objRegister);

        return res
            .status(200)
            .json({ response:'Login exitoso', body:responseRegister });
    }
    catch (err) {
        handleHTTP(res, 'LOGIN_ERROR', err);
    }
}

const controllerLogin = async ({body}:Request, res:Response) => {
    try {
        const sendService:UserLogin = {
            role: body.role,
            email: body.email,
            ci: body.ci
        }

        const REGEX = {
            ci: /^[a-zA-Z0-9]{7,50}/,
            email: /^([a-zA-Z0-9_\-]+)@/
        }
        
        if(!REGEX.ci.test(sendService.ci)) throw new Error('DANGER_CI_INVALID')
        if(!REGEX.email.test(sendService.email)) throw new Error('DANGER_EMAIL_INVALID')

        const responseLogin = await Login(sendService);

        return res
            .status(200)
            .cookie('token', responseLogin.token)
            .json({ response:'SUCCESS_LOGIN', body:responseLogin });
    }
    catch (err) {
        console.log(err)
        handleHTTP(res, `${err}`, err);
    }
}

const controllerRefresToken = async (req:Request, res:Response) => {
    try {
        const id:number = parseInt(`${req.params.id}`);

        const responseRefresht = await RefresToken(id);

        return res
            .status(200)
            .cookie('token', responseRefresht.token)
            .json({ response:'SUCCESS_REFRESH_TOKEN', body:responseRefresht });
    }
    catch (err) {
        console.log(err);
        handleHTTP(res, `${err}`, err);
    }
}

const controllerClosedSession = async (req:RequestExtend, res:Response) => {
    try {
        const id = req.params.id;

        const responseClosed = await ClosedSession(parseInt(`${id}`));

        return res
            .status(200)
            .json({ response:'SUCCESS_CLOSED_SESSION' })

    } catch (error) {
        console.log(error);
        handleHTTP(res, `${error}`, error);
    }
}

const controllerSetPassword = async (req: RequestExtend, res: Response) => {
    try {
        const id = req.params.id;
        const password = req.body.new_password;

        const responseSetPassword = await UpdatePassword(password, parseInt(`${id}`));

        return res
            .status(200)
            .json({ response:'SUCCESS_SET_PASSWORD' })

    } catch (error) {
        console.log(error);
        handleHTTP(res, `${error}`, error);
    }
}

export { controllerLogin, controllerRegister, controllerRefresToken, controllerClosedSession, controllerSetPassword };
