import { Request, Response } from 'express'
import { JWTAuthentication } from '../../../utils/JWTAuthentication'
import { UserDB } from '../../../data/UserDB'
import { UpdateInfoUserUC } from '../../../business/usecase/user/UpdateInfoUserUC'

export const updateInfos = async(req: Request, res: Response) => {
    try{

        const jwtAuth = new JWTAuthentication()
        const userId = jwtAuth.verifyToken(req.headers.auth as string)

        const updateInfosUserUC = new UpdateInfoUserUC(new UserDB())
        const result = await updateInfosUserUC.execute({
            userId,
            newName: req.body.newName,
            newEmail: req.body.newEmail,
            newBirthDate: req.body.newBirthDate
        })
        res.status(200).send(result)

    }catch(err){
        res.status(err.errorCode || 400).send({
            message: err.message
        })
    }

//apenas teste

