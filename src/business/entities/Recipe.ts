export class Recipe{
    constructor(
        private id: string,
        private title: string,
        private description: string,
        private creationDate: Date,
        private userId: string,
    ){}

    getId(): string{
        return this.id
    }

    getTitle(): string{
        return this.title
    }

    getDescription(): string{
        return this.description
    }

    getCreationDate(): Date{
        return this.creationDate
    }

    getUserId(): string{
        return this.userId
    }
}