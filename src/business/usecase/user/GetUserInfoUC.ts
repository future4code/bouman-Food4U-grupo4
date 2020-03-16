import { UserDB } from '../../../data/UserDB';

export class GetUserInfoUC {
    constructor(private db: UserDB) { }

    public async execute(input: GetUserInfoInput): Promise<GetUserInfoOutput>{
       
        const user = await this.db.getUserById(input.id)

        if(!user){
            throw new Error("User not found")
        }

        return{
            id: user.getId(),
            email: user.getEmail()
        }

    }
    
}

interface GetUserInfoInput {
    id: string
}

interface GetUserInfoOutput {
    id: string,
    email: string
}