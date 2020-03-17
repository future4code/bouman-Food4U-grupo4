import {Request,Response} from 'express'
import { JWTAuthentication } from "../../../utils/JWTAuthentication"
import { CreateRecipeUC } from "../../../business/usecase/recipes/CreateRecipeUseCase"
import { RecipeDB } from "../../../data/RecipeDB"

export const createRecipeEndpoint = async(req: Request, res: Response) => {
    try{

        const jwtAuth = new JWTAuthentication()
        const id = jwtAuth.verifyToken(req.headers.auth as string)

        const recipeDB =  new RecipeDB
        const useCase = new CreateRecipeUC(recipeDB)

        const input = {
            userId: '',
            title: req.body.title,
            description: req.body.description
        }

        const result = await useCase.execute(input)

        res.status(200).send(result)

    }catch(err){
        res.status(err.errorCode || 400).send({
            message: err.message
        })
    }
}