import * as jwt from 'jsonwebtoken'

export class JWTAuthentication {

    private SECRET: string

    constructor(){
        this.SECRET = "bananinha"
    }

    generateToken(id: string) {
        return jwt.sign({ id },this.SECRET,{ expiresIn: '1h' })
    }

    verifyToken(token: string):string {
        const data = jwt.verify(token, this.SECRET) as {id: string}

        return data.id
    }
}
