import { UserDB } from "../../../data/UserDB";
import * as bcrypt from 'bcrypt';

export class UpdatePasswordUC {
    constructor(private db: UserDB) { }

    public async execute(input: UpdatePasswordInput): Promise<UpdatePasswordOutput> {

        try {
            const user = await this.db.getUserById(input.userId)

            if (!user) {
                throw new Error('User Not Found')
            }

            const isPasswordCorrect = await bcrypt.compare(input.currentPassword, user.getPassword())

            if (!isPasswordCorrect) {
                throw new Error('incorrect password')
            }

            const hashPassword = await bcrypt.hash(input.newPassword, 10)
            await this.db.updatePassword(input.userId, hashPassword)

            return { message: "password updated successfully" }

        }catch (err) {
            return { message: err }
        }


    }
}

export interface UpdatePasswordInput {
    userId: string,
    currentPassword: string,
    newPassword: string
}

export interface UpdatePasswordOutput {
    message: string
}