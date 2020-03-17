import { BaseDB } from "./baseDataBase";
import { RecipeGateway } from "../business/gateways/RecipeGateway";
import { Recipe } from "../business/entities/Recipe";

export class RecipeDB extends BaseDB implements RecipeGateway{
    private usersTableName = "recipes"

    async createRecipe(recipe: Recipe): Promise<void>{
        this.connection.insert({
            id: recipe.getId(),
            title: recipe.getTitle(),
            description: recipe.getDescription(),
            creationDate: recipe.getCreationDate(),
            userId: recipe.getUserId()
        }).into(this.usersTableName)
    }
}