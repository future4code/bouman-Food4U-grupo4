import {Request,Response} from 'express'
import { UserDB } from "../../../data/UserDB"
import { JWTAuthentication } from "../../../utils/JWTAuthentication"
import { FollowUserUC } from "../../../business/usecase/user/FollowUserUC"

export const followUser = async(req: Request, res: Response) => {
    try{

        const jwtAuth = new JWTAuthentication()
        const userId = jwtAuth.verifyToken(req.headers.auth as string)

        const followUserUC = new FollowUserUC(new UserDB())

        const result = await followUserUC.execute({
            userId,
            userToFollowId: req.body.userToFollowId
        })

        res.status(200).send(result)

    }catch(err){
        res.status(err.errorCode || 400).send({
            message: err.message
        })
    }
}