import { LoginUseCase } from "../business/usecase/loginUseCase"
import {Request,Response} from 'express'

export const loginEndpoint = async(req: Request, res: Response) => {
    const useCase = new LoginUseCase()

    const input = {
        email: req.body.email,
        password: req.body.password
    }

    try{
        await useCase.execute(input)
        res.send({message: 'usuario logado'})
    }catch (err) {
        res.status(500).send({message: err.message})
    }
}