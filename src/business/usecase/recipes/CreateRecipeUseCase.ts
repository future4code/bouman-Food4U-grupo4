import {v4} from 'uuid'
import { Recipe } from '../../entities/Recipe'
import { RecipeGateway } from '../../gateways/RecipeGateway'

export class CreateRecipeUC{
 constructor(private recipeGateway: RecipeGateway){}
     async execute(input: CreateRecipeInput){
        const recipeId = v4()
        const newRecipe = new Recipe(recipeId,input.title,input.description, new Date(), input.userId)
        await this.recipeGateway.createRecipe(newRecipe)
     }
}


interface CreateRecipeInput{
    title: string
    description: string
    userId:string
}

