export class PasswordLog {
    constructor(
        private timestamp: number,
        private exchangeTime: string,
        private userId: string
    ){}

    getTimestamp(): number{
        return this.timestamp
    }

    setTimestamp(tokenTimer:number){
        this.timestamp = tokenTimer
    }

    getExchangeTime(): string{
        return this.exchangeTime
    }

    setExchangeTime(exchangeTime:string){
        this.exchangeTime = exchangeTime
    }

    getUserId():string{
        return this.userId
    }

    setUserId(userId:string){
        this.userId = userId
    }
}