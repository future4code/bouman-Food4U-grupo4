import { UserDB } from "../../../data/UserDB";
import { v4 } from "uuid"
import { User } from "../../entities/User";
import * as bcrypt from "bcrypt"

export class SignUpUC {
    constructor(private db: UserDB) { }

    public async execute(input: SignUpInput): Promise<SignUpOutput> {

        try {
            const id = v4()

            const hashPassword = await bcrypt.hash(input.password, 10)

            const newUser = new User(
                id,
                input.name,
                input.email,
                hashPassword,
                input.birth_date
            )

            await this.db.createUser(newUser)
            
            return({
                message: "User created successfully"
            })

        }catch(err){
            console.log(err)
            throw new Error("There was a problem creating a user!")
        }

    }
}

interface SignUpInput {
    name: string
    email: string
    password: string
    birth_date: Date
}

interface SignUpOutput {
    message: string
}