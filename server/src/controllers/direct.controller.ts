import { Response } from "express";
import { RequestExtend } from "../interfaces/jwt.interface";
import { handleHTTP } from "../util/error.handle";
import { UserRegister } from "../interfaces/user.interface";
import { GetAdmins, RegisterAdmin, DeleteAdmin } from "../services/direct.service";
import { GenerateLog } from "../util/logs.handle";

const ControllerRegisterAdmin = async (req: RequestExtend, res:Response) => {
    try {
        const objRegister: UserRegister = {
            name: req.body.name,
            lastname: req.body.lastname,
            ci: req.body.ci,
            phone: req.body.phone,
            email: req.body.email,
            password: '',
            role: req.body.role,
            status: 'ACTIVE'       
        }
        objRegister.password = objRegister.ci;
        const id = req.user.userid;
        const responseRegister = await RegisterAdmin(objRegister, id);

        GenerateLog({
            id: parseInt(req.user.userid),
            code:200,
            data:'SUCCESS_CREATE_ADMIN_OR_SECRETARY',
            description:`${req.body.role} creado exitosamente`,
            url:'/direct/register'
        });
        return res
            .status(200)
            .json({ response:'SUCCESS_ADMIN_CREATE', body:responseRegister });
    }
    catch (error) {
        GenerateLog({
            id: parseInt(req.user.userid),
            code:400,
            data:'DANGER_CREATE_ADMIN_OR_SECRETARY',
            description:`error al crear ${req.body.role}`,
            url:'/direct/register'
        });
        handleHTTP(res, 'DANGER_CREATE_ADMIN', error);
    }
}

const ControllerGetAllAdmin = async (req: RequestExtend, res:Response) => {
    try {
        
        const id = req.user.userid;
        const responseRegister = await GetAdmins(id);

        GenerateLog({
            id: parseInt(req.user.userid),
            code:200,
            data:'SUCCESS_READ_ADMIN_OR_SECRETARY',
            description:'admin o secretario',
            url:'/direct/admin'
        });
        return res
            .status(200)
            .json({ response:'SUCCESS_GET_ALL_ADMIN', body:responseRegister });
    }
    catch (error) {
        GenerateLog({
            id: parseInt(req.user.userid),
            code:400,
            data:'DANGER_READ_ADMIN_OR_SECRETARY',
            description:'error al leer admin o secretario',
            url:'/direct/admin'
        });
        handleHTTP(res, 'DANGER_CREATE_ADMIN', error);
    }
}

const ControllerDeleteAdmin = async (req: RequestExtend, res:Response) => {
    try {
        
        const id = req.user.userid;
        const responseRegister = await DeleteAdmin(req.body.id, id);

        GenerateLog({
            id: parseInt(req.user.userid),
            code:200,
            data:'SUCCESS_DELETE_ADMIN_OR_SECRETARY',
            description:'admin o secretario eliminado exitosamente',
            url:'/direct/admin/:id'
        });
        return res
            .status(200)
            .json({ response:'SUCCESS_DELETE_ADMIN', body:responseRegister });
    }
    catch (error) {
        GenerateLog({
            id: parseInt(req.user.userid),
            code:400,
            data:'DANGER_DELETE_ADMIN_OR_SECRETARY',
            description:'error al eliminar admin o secretario',
            url:'/direct/admin/:id'
        });
        handleHTTP(res, 'DANGER_DELETE_ADMIN', error);
    }
}

export { ControllerRegisterAdmin, ControllerGetAllAdmin, ControllerDeleteAdmin }
