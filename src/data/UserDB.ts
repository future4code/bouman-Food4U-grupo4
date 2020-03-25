import { BaseDB } from "./baseDataBase";
import { User } from "../business/entities/User";
import { PasswordLog } from "../business/entities/PasswordLog";

export class UserDB extends BaseDB {
    private usersTableName = "users"
    private usersRelationsTableName = "users_relations"
    private passwordLogTable = "password_log"

    private mapDateToDbDate(input: string): string {
        let day = input.split("/")[0];
        let month = input.split("/")[1];
        let year = input.split("/")[2];
        return year + '-' + ("0" + month).slice(-2) + '-' + ("0" + day).slice(-2);
    }

    public async createUser(user: User): Promise<void> {

        await this.connection.insert({

            id: user.getId(),
            name: user.getName(),
            email: user.getEmail(),
            birth_date: this.mapDateToDbDate(user.getBirthDate()),
            password: user.getPassword()

        }).into(this.usersTableName)
    }

    public async getUserByEmail(email: string): Promise<User | undefined> {
        const user = await this.connection.select('*')
            .from(this.usersTableName)
            .where({ email })

        if (!user[0]) {
            return undefined
        }

        return new User(
            user[0].id,
            user[0].name,
            user[0].email,
            user[0].password,
            user[0].birth_date
        )
    }

    public async getUserById(id: string): Promise<User | undefined> {
        const user = await this.connection.select('*')
            .from(this.usersTableName)
            .where({ id })

        if (!user[0]) {
            return undefined
        }

        return new User(
            user[0].id,
            user[0].name,
            user[0].email,
            user[0].password,
            user[0].birth_date
        )
    }

    public async createUserFollowRelation(followerId: string, followedId: string): Promise<void | undefined> {

        await this.connection.insert({
            followerId,
            followedId
        }).into(this.usersRelationsTableName)

    }

    public async updatePassword(userId: string, newPassword: string): Promise<void> {

        try {
            await this.connection(this.usersTableName)
                .where('id', '=', userId)
                .update({
                    password: newPassword
                })
        } catch (err) {
            console.log(err)
            throw err
        }
    }


    public async createPasswordLog(userId: string, timestamp: number, exchangeTime: string): Promise<void> {

        await this.connection.insert({
            timestamp,
            exchangeTime,
            userId
        }).into(this.passwordLogTable)

    }

    public async getPaswordLogByUserId(userId: string): Promise<PasswordLog> {

        const result = await this.connection.select("*")
            .from(this.passwordLogTable)
            .where({ userId })

        return new PasswordLog(
            result[0].timestamp,
            result[0].exchangeTime,
            result[0].userId
        )

    }

    public async updatePasswordLog(userId: string, newTimestamp: number, exchangeTime: string): Promise<void> {

        try {

            await this.connection(this.passwordLogTable)
                .where('userId', '=', userId)
                .update({
                    timestamp: newTimestamp,
                    exchangeTime
                })

        } catch (err) {
            console.log(err)
            throw err
        }

    }

    public async updateInfoUser(userId: string, newName: string, newEmail: string, newBithDate: string): Promise<void>{
        try{
            await this.connection(this.usersTableName)
            .where('id', '=', userId)
            .update({
                name: newName,
                email: newEmail,
                birth_date: newBithDate
            })
        }catch(err){
            console.log(err)
            throw err
        }
    }

}

