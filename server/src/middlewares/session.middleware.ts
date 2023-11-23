import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import { RequestExtend } from '../interfaces/jwt.interface';

export const SECRET_KEY = 'API_REST_TS';

export const auth = async (req: RequestExtend, res: Response, next:NextFunction) => {
    try {
        const token = req.header('token');

        if(!token) {
            throw new Error('NOT_TOKEN');
        }

        const decoded = jwt.verify(token, SECRET_KEY); // Decodificando el token
        req.user = decoded;

        next(); // OK
        
    }
    catch(e) {
        // send error
        res
            .status(401)
            .json({ response:'HAVE_REFRES_TOKEN', body:null, err:e });
    }
}

export const resetToken = async (req: RequestExtend, res: Response, next:NextFunction) => {
    try {
        const token = req.header('token');

        if(!token) {
            throw new Error('NOT_TOKEN');
        }

        const decoded = jwt.verify(token, SECRET_KEY); // Decodificando el token
        req.user = decoded;

        next(); // OK
        
    }
    catch(e) {
        // send error
        res
            .status(401)
            .json({ response:'HAVE_REFRES_TOKEN', body:null, err:e });
    }
}
