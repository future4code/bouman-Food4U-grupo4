import {Request,Response} from 'express'
import { JWTAuthentication } from '../../../utils/JWTAuthentication'
import { GetRecipesFeedUC } from '../../../business/usecase/recipes/GetRecipesFeedUC'
import { RecipeDB } from '../../../data/RecipeDB'

export const getRecipesFeed = async (req: Request, res: Response) => {
    try{
        const jwtAuth = new JWTAuthentication()
        const followerId = jwtAuth.verifyToken(req.headers.auth as string)

        const getRecipesFeedUC = new GetRecipesFeedUC(new RecipeDB())

        const result = await getRecipesFeedUC.execute({
            followerId
        })

        res.status(200).send(result)

    }catch(err){
        res.status(err.errorCode || 400).send({
            message: err.message
        })
    }
}