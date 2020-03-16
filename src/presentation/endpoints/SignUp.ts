import { Request, Response } from "express";
import { SignUpUC } from "../../business/usecase/SignUpUC";
import { UserDB } from "../../data/UserDB";

export const signUpEndpoint = async (req:Request, res:Response) => {
    try{
        const signUpUC = new SignUpUC(new UserDB())
        const result = await signUpUC.execute({
            email: req.body.email,
            password: req.body.password
        })

        res.status(200).send(result)
    }catch(err){
        res.status(err.errorCode || 400).send({
            message: err.message
        })
    }
}