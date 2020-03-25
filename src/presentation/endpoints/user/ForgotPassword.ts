import { Request, Response } from 'express'
import { UserDB } from '../../../data/UserDB'
import { ForgotPasswordUC } from '../../../business/usecase/user/ForgotPasswordUC'

export const forgotPassword = async (req: Request, res: Response) => {
    try {

        const forgotPasswordUC = new ForgotPasswordUC(new UserDB())
        const result = await forgotPasswordUC.execute({
            userEmail: req.body.userEmail
        })

        res.status(200).send(result)
    } catch (err) {
        res.status(err.errorCode || 400).send({
            message: err.message
        })
    }
}