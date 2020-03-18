export class Recipe{
    constructor(
        private id: string,
        private title: string,
        private description: string,
        private postDate: Date,
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

    getPostDate(): Date{
        return this.postDate
    }

    getUserId(): string{
        return this.userId
    }
}