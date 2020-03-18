import { Recipe } from "./Recipe";

export class FeedRecipe extends Recipe {
    constructor(
        id: string,
        title: string,
        description: string,
        postDate: Date,
        userId: string,
        private userName: string,
        private userEmail: string
    ) {
        super(
            id,
            title,
            description,
            postDate,
            userId
        )
    }

    getUserName():string {
        return this.userName
    }

    setUserName(userName:string) {
        this.userName = userName
    }

    getUserEmail():string {
        return this.userEmail
    }

    setUserEmail(userEmail:string) {
        this.userEmail = userEmail
    }
}