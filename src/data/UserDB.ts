import { BaseDB } from "./baseDataBase";
import { User } from "../business/entities/User";

export class UserDB extends BaseDB {
    private usersTableName = "users"

    private mapDateToDbDate(input: string): string {
        let day  = input.split("/")[0];
        let month  = input.split("/")[1];
        let year  = input.split("/")[2];
        return year + '-' + ("0"+month).slice(-2) + '-' + ("0"+day).slice(-2);
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

}