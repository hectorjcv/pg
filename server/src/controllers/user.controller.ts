import { Response } from "express";
import { RequestExtend } from "../interfaces/jwt.interface";
import { handleHTTP } from "../util/error.handle";
import { GetUserCompleted } from "../services/user.service";

const UserCtrl = async (req: RequestExtend, res: Response) => {
    try {
        const id: number = req.user.id
        const responseService = await GetUserCompleted(id);

        return res
            .status(200)
            .json({ 
                response:'SUCCESS_GET_USER_COMPLETED',
                body: responseService
            })

    } catch (err) {
        handleHTTP(res, 'LOGIN_ERROR', err);
    }
}

export { UserCtrl }
