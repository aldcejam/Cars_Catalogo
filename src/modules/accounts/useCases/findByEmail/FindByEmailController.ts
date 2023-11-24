import { Request, Response } from "express"
import { container } from "tsyringe"
import { FindByEmailUseCase } from "./FindByEmailUseCase"

class FindByEmailController{

    async handle(req: Request, res: Response): Promise<Response>{
        const { email } = req.body

        const findByEmailUseCase = container.resolve(FindByEmailUseCase)

        const user = await findByEmailUseCase.execute({email})

        return res.json(user)
    }
}

export { FindByEmailController }