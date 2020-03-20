import { UserDB } from "../../../data/UserDB";
import generator from 'generate-password';
import { Nodemailer } from "../../../utils/Nodemailer";
import * as bcrypt from 'bcrypt';

export class ForgotPasswordUC {

    constructor(private db: UserDB) { }

    public async execute(input: ForgotPasswordInput) {
        const user = await this.db.getUserByEmail(input.userEmail)

        if (!user) {
            throw new Error('incorrect email')
        }

        const newPassword = generator.generate({
            length: 10,
            numbers: true
        })     

        const nodemailer = new Nodemailer()

        nodemailer.sendMailPassword(user.getEmail(), user.getName(), newPassword)

        const hashPassword = await bcrypt.hash(newPassword, 10)
        this.db.updatePassword(user.getId(), hashPassword)

        return { message: "Password sent and updated successfully" }
    }

}

export interface ForgotPasswordInput {
    userEmail: string
}

export interface ForgotPasswordOutput {
    message: string
}


