import { BaseDB } from "./baseDataBase";
import { RecipeGateway } from "../business/gateways/RecipeGateway";
import { Recipe } from "../business/entities/Recipe";
import { User } from "../business/entities/User";
import { FeedRecipe } from "../business/entities/FeedRecipe";

export class RecipeDB extends BaseDB implements RecipeGateway {
    private recipesTableName = "recipes"
    private usersTableName = "users"
    private usersRelationsTableName = "users_relations"

    public async createRecipe(recipe: Recipe): Promise<void> {

        await this.connection.insert({
            id: recipe.getId(),
            title: recipe.getTitle(),
            description: recipe.getDescription(),
            postDate: recipe.getPostDate(),
            userId: recipe.getUserId()
        }).into(this.recipesTableName)

    }

    public async getRecipes(followerId: string): Promise<FeedRecipe[]> {

        const recipes = await this.connection
            .select('recipes.*', 'users.email', 'users.name')
            .from(this.usersRelationsTableName)
            .innerJoin(this.recipesTableName, 'recipes.userId', 'users_relations.followedId')
            .innerJoin(this.usersTableName, 'users_relations.followedId', 'users.id')
            .where({ followerId })
            .orderBy('recipes.postDate', 'desc')
            
        return recipes.map((recipe:any) => {
            return new FeedRecipe(
                recipe.id,
                recipe.title,
                recipe.description,
                recipe.postDate,
                recipe.userId,
                recipe.name,
                recipe.email
            )
        })
    }
}