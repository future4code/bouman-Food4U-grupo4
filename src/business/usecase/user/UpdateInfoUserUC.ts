import { UserDB } from "../../../data/UserDB";

export class UpdateInfoUserUC {
    constructor(private db: UserDB){}

    public async execute(input: UpdateInfoInput): Promise<UpdateInfoOutput> {

        try {
            const user = await this.db.getUserById(input.userId)
            if (!user) {
                throw new Error('User Not Found')
            }

            await this.db.updateInfoUser(input.userId,input.newName,input.newEmail,input.newBirthDate)
            return { message: "infos updated successfully" }

        }catch (err) {
            return { message: err }
        }


    }
}

export interface UpdateInfoInput{
    userId: string,
    newName: string,
    newEmail:string,
    newBirthDate: string
}

export interface UpdateInfoOutput{
    message:string
}