import * as jwt from 'jsonwebtoken'

export class JWTAuthentication {

    private SECRET: string

    constructor(){
        this.SECRET = "bananinha"
    }

    generateToken(id: string) {
        return jwt.sign({ id },this.SECRET,{ expiresIn: '1h' })
    }

    generateTokenToPassword(id: string) {
        return jwt.sign({ id }, this.SECRET,{ expiresIn: '2h' })
    }

    verifyToken(token: string):string {
        const data = jwt.verify(token, this.SECRET) as {id: string}

        return data.id
    }

    verifyTokenOfPassword(token: string):Date {
        const data = jwt.verify(token, this.SECRET) as { exp: Date }
        return data.exp
    }
}
