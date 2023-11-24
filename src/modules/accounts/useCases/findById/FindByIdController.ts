import { Request, Response } from "express";
import { container } from "tsyringe";
import { FindbyIdUseCase } from "./FindByIdUseCase";

class FindByIdController{

    async handle(req: Request, res: Response): Promise<Response>{
        const { id } = req.params;

        const findByIdUseCase = container.resolve(FindbyIdUseCase);
        const user = await findByIdUseCase.execute({id});

        return res.status(200).json(user);
    }
}

export { FindByIdController }