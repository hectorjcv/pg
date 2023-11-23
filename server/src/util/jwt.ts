import jwt from 'jsonwebtoken';
import { CustomRequets } from '../interfaces/jwt.interface'; 
import { NextFunction, Request, Response } from 'express';

export const SECRET_KEY = 'API_REST_TS';

export const auth = async (req: Request, res: Response, next:NextFunction) => {
    try {
        // req.header viene del cliente con el valor token
        const token = req.header('token');
        // console.log(token);

        if(!token) {
            throw new Error();
        }

        const decoded = jwt.verify(token, SECRET_KEY); // Decodificando el token
        (req  as CustomRequets).token = decoded;

        next(); // OK
    }
    catch(e) {
        // send error
        res
            .status(401)
            .json({ response:'Inicia sesion', body:null });
    }
}
