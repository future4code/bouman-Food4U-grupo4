export class User {

    constructor(
        private id: string,
        private name: string,
        private email: string,
        private password: string,
        private birth_date: Date,
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

    getName():string{
        return this.name
    }

    getBirthDate():Date{
        return this.birth_date
    }

}
