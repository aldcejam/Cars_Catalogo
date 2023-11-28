import { Request, Response } from "express";
import { CreateSpecificationUseCase } from "@application/cars/createSpecification/CreateSpecificationUseCase";
import { container } from "tsyringe";

class CreateSpecificationController { 

  async handle(req: Request, res: Response) {
    const { name, description } = req.body;
    
    const createSpecificationUseCase = container.resolve(CreateSpecificationUseCase);
    
    await createSpecificationUseCase.execute({name, description})

    return res.status(201).send();
  }
}

export { CreateSpecificationController };