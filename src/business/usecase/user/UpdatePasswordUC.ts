import { UserDB } from "../../../data/UserDB";
import * as bcrypt from 'bcrypt';
import moment from "moment";

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

            
            const passwordLog = await this.db.getPaswordLogByUserId(user.getId())
            const timestampLog = passwordLog.getTimestamp()
            const currentTime = new Date().getTime()
            const oneOur = 1000*60*60
            const calculateTimeDifference = (currentTime - timestampLog)/oneOur
            
            if(calculateTimeDifference < 2){
                return { 
                    message: `Password change denied, it is only possible to change the password two hours after the last change. Your last password change was ${passwordLog.getExchangeTime()}`
                }
            }

            const newTimestamp = new Date().getTime()
            const exchangeTime = moment().format('L, LTS')
            await this.db.updatePasswordLog(user.getId(), newTimestamp, exchangeTime)

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