import { UserDB } from "../../../data/UserDB";

export class FollowUserUC {

    constructor(private db: UserDB) {}

    public async execute(input: FollowUserInput): Promise<FollowUserOutput> {

        try{

            await this.db.createUserFollowRelation(input.userId, input.userToFollowId)

            return { message: "user successfully followed" }

        }catch(err){

            console.log(err)
            if(err.errno === 1062){
                return { message: "user is already being followed" }
            }
            return { message: "user not found" }

        }
    }
}

export interface FollowUserInput{
    userId: string,
    userToFollowId: string
}

export interface FollowUserOutput{
    message: string
}