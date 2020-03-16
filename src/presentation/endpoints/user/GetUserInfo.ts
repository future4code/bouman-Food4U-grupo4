import { GetUserInfoUC } from "../../../business/usecase/user/GetUserInfoUC"
import {Request,Response} from 'express'
import { UserDB } from "../../../data/UserDB"
import { JWTAuthentication } from "../../../utils/JWTAuthentication"

export const getUserIfo = async(req: Request, res: Response) => {
    try{

        const jwtAuth = new JWTAuthentication()
        const id = jwtAuth.verifyToken(req.headers.auth as string)

        const getUserIfoUC = new GetUserInfoUC(new UserDB())

        const result = await getUserIfoUC.execute({id})

        res.status(200).send(result)

    }catch(err){
        res.status(err.errorCode || 400).send({
            message: err.message
        })
    }
}