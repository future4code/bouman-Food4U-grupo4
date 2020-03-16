import * as bcrypt from 'bcrypt';
import { UserDB } from '../../../data/UserDB';
import { JWTAuthentication } from '../../../utils/JWTAuthentication';

export class LoginUseCase {
    constructor(private db: UserDB) { }

    public async execute(input: LoginInput): Promise<LoginOutput>{
       
        const user = await this.db.getUserByEmail(input.email)

         if(!user){
            throw new Error('incorrect email')
        }

        const isPasswordCorrect = await bcrypt.compare(input.password, user.getPassword())

        if(!isPasswordCorrect){
            throw new Error('incorrect password')
        }

        const jwtAuth = new JWTAuthentication()
        const token = jwtAuth.generateToken(user.getId())

        return ({ message: "User successfully logged in", token })

    }
    
}

interface LoginInput {
    email: string
    password: string
}

interface LoginOutput {
    message: string,
    token: string
}