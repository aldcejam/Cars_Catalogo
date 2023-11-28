import { Request, Response } from 'express';
import { CreateUserUseCase } from '@application/accounts/createUser/CreateUserUseCase';
import { container } from 'tsyringe';

class CreateUserController{

    async handle(req: Request, res: Response): Promise<Response>{
        const { name, email, password, driver_license } = req.body

        const createUserUseCase = container.resolve(CreateUserUseCase)
 
        await createUserUseCase.execute({
            name, 
            email,
            password,
            driver_license
        })

        return res.status(201).send()
    }

}

export { CreateUserController }