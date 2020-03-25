import { v4 } from 'uuid'
import { Recipe } from '../../entities/Recipe'
import { RecipeGateway } from '../../gateways/RecipeGateway'

export class CreateRecipeUC {
    constructor(private recipeGateway: RecipeGateway) { }

    public async execute(input: CreateRecipeInput): Promise<CreateRecipeOutput> {

        try {

            const recipeId = v4()

            const postDateGenerated = new Date()

            const newRecipe = new Recipe(
                recipeId,
                input.title,
                input.description,
                postDateGenerated,
                input.userId
            )

            await this.recipeGateway.createRecipe(newRecipe)

            return { message: "recipe successfully created" }
        
        }catch(err){
            console.log(err)
            return { message: "error" }
        }

    }
}


interface CreateRecipeInput {
    title: string
    description: string
    userId: string
}

interface CreateRecipeOutput {
    message: string
}
