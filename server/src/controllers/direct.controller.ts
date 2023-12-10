import { Response } from "express";
import { RequestExtend } from "../interfaces/jwt.interface";
import { handleHTTP } from "../util/error.handle";
import { UserRegister } from "../interfaces/user.interface";
import { GetAdmins, RegisterAdmin, DeleteAdmin } from "../services/direct.service";

const ControllerRegisterAdmin = async (req: RequestExtend, res:Response) => {
    try {
        const objRegister: UserRegister = {
            name: req.body.name,
            lastname: req.body.lastname,
            ci: req.body.ci,
            phone: req.body.phone,
            email: req.body.email,
            password: '',
            role: 'ADMIN',
            status: 'ACTIVE'       
        }
        objRegister.password = objRegister.ci;
        const id = req.user.userid;
        const responseRegister = await RegisterAdmin(objRegister, id);

        return res
            .status(200)
            .json({ response:'SUCCESS_ADMIN_CREATE', body:responseRegister });
    }
    catch (error) {
        handleHTTP(res, 'DANGER_CREATE_ADMIN', error);
    }
}

const ControllerGetAllAdmin = async (req: RequestExtend, res:Response) => {
    try {
        
        const id = req.user.userid;
        const responseRegister = await GetAdmins(id);

        return res
            .status(200)
            .json({ response:'SUCCESS_GET_ALL_ADMIN', body:responseRegister });
    }
    catch (error) {
        handleHTTP(res, 'DANGER_CREATE_ADMIN', error);
    }
}

const ControllerDeleteAdmin = async (req: RequestExtend, res:Response) => {
    try {
        
        const id = req.user.userid;
        const responseRegister = await DeleteAdmin(req.body.id, id);

        return res
            .status(200)
            .json({ response:'SUCCESS_DELETE_ADMIN', body:responseRegister });
    }
    catch (error) {
        handleHTTP(res, 'DANGER_BLOQUED_ADMIN', error);
    }
}

export { ControllerRegisterAdmin, ControllerGetAllAdmin, ControllerDeleteAdmin }
