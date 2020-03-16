import {v4} from 'uuid';
import * as bcrypt from 'bcrypt';

interface LoginInput {
    email: string
    password: string
}

export class LoginUseCase {
    async execute(input: LoginInput){
       
        const userDatabase =  new UserDatabase()
        const user = await userDatabase.getUserByEmail(input.email)
         if(!user){
            throw new Error('email incorreto')
        }

        const isPassword = await bcrypt.compare(input.password, user.getPassword())

        if(!isPassword){
            throw new Error('senha incorreta')
        }
            
        return true
    }
    
}