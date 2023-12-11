import { Response } from "express";

export const handleHTTP = async (res:Response, error:string, errorRap?:any) => {
    console.log(errorRap);
    return res
        .status(400)
        .json({ response:error, body:errorRap });
}