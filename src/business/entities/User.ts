export class User {

    constructor(
        private id: string,
        private email: string,
        private password: string
    ){}

    getId():string{
        return this.id
    }
    
    getEmail():string{
        return this.email
    }

    getPassword():string{
        return this.password
    }
}