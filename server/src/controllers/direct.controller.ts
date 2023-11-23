import { Response } from "express";
import { RequestExtend } from "../interfaces/jwt.interface";
import { handleHTTP } from "../util/error.handle";
import { UserRegister } from "../interfaces/user.interface";
import { GetAdmins, RegisterAdmin, BloquedAdmin, DisBloquedAdmin } from "../services/direct.service";

const ControllerRegisterAdmin = async (req: RequestExtend, res:Response) => {
    try {
        const objRegister: UserRegister = {
            name: req.body.name,
            lastname: req.body.lastname,
            ci: req.body.ci,
            phone: req.body.phone,
            email: req.body.email,
            role: 'ADMIN',
            status: 'ACTIVE'       
        }
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

const ControllerBloquedAdmin = async (req: RequestExtend, res:Response) => {
    try {
        
        const id = req.user.userid;
        const responseRegister = await BloquedAdmin(req.body.id, id);

        return res
            .status(200)
            .json({ response:'SUCCESS_BLOQUED_ADMIN', body:responseRegister });
    }
    catch (error) {
        handleHTTP(res, 'DANGER_BLOQUED_ADMIN', error);
    }
}

const ControllerDisBloquedAdmin = async (req: RequestExtend, res:Response) => {
    try {
        const id = req.user.userid;
        const responseRegister = await DisBloquedAdmin(req.body.id, id);

        return res
            .status(200)
            .json({ response:'SUCCESS_DISBLOQUED_ADMIN', body:responseRegister });
    }
    catch (error) {
        handleHTTP(res, 'DANGER_DISBLOQUED_ADMIN', error);
    }
}

export { ControllerRegisterAdmin, ControllerGetAllAdmin, ControllerBloquedAdmin, ControllerDisBloquedAdmin }
