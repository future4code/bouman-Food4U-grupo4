import { LoginUseCase } from "../../../business/usecase/user/loginUseCase"
import {Request,Response} from 'express'
import { UserDB } from "../../../data/UserDB"

export const loginEndpoint = async(req: Request, res: Response) => {
    try{
        const loginUC = new LoginUseCase(new UserDB())
        const result = await loginUC.execute({
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