import { container } from "tsyringe";
import { FindCarsUseCase } from "./FindCarsUseCase";
import { Request, Response } from "express";
import { IFindAvailabeCarsDTO } from "DTOS/cars/IFindAvailabeCarsDTO";

class FindCarsController{ 
    async handle(request: Request, response: Response): Promise<Response> { 
        const { name, brand, category_id } = request.body as IFindAvailabeCarsDTO;
        const findAllAvailableCarsUseCase = container.resolve(FindCarsUseCase);
        const cars = await findAllAvailableCarsUseCase.execute({
            name,
            brand,
            category_id
        });
        return response.json(cars);
    } 
}

export { FindCarsController };