import { BaseDB } from "./baseDataBase";
import { User } from "../business/entities/User";

export class UserDB extends BaseDB {
    private usersTableName = "users"

    public async createUser(user:User): Promise<void> {

        await this.connection.insert({

            id: user.getId(),
            email: user.getEmail(),
            password: user.getPassword()

        }).into(this.usersTableName)
    }
}