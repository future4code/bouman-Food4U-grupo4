import { Request, Response } from 'express'
import { JWTAuthentication } from '../../../utils/JWTAuthentication'
import { UpdatePasswordUC } from '../../../business/usecase/user/UpdatePasswordUC'
import { UserDB } from '../../../data/UserDB'

export const updatePassword = async (req: Request, res: Response) => {

    try {

        const jwtAuth = new JWTAuthentication()
        const userId = jwtAuth.verifyToken(req.headers.auth as string)
        
        const updatePasswordUC = new UpdatePasswordUC(new UserDB())
        const result = await updatePasswordUC.execute({
            userId,
            currentPassword: req.body.currentPassword,
            newPassword: req.body.newPassword
        })

        res.status(200).send(result)

    } catch (err) {
        res.status(err.errorCode || 400).send({
            message: err.message
        })
    }

}