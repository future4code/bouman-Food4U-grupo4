import { Recipe } from "../entities/Recipe";

export interface RecipeGateway{
    createRecipe(recipe: Recipe): Promise<void>    
}