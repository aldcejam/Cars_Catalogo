import { container } from "tsyringe";
import { FindCarsUseCase } from "./FindCarsUseCase";
import { Request, Response } from "express";
import { IFindAvailabeCarsDTO } from "DTOS/cars/IFindAvailabeCarsDTO";

class FindCarsController{ 
    async handle(request: Request, response: Response): Promise<Response> { 
        const findAllAvailableCarsUseCase = container.resolve(FindCarsUseCase);
        const { name, brand, category_id } = request.query as IFindAvailabeCarsDTO;
        if (name || brand || category_id) {
            const cars = await findAllAvailableCarsUseCase.execute({
                name,
                brand,
                category_id
            });
            return response.json(cars);
        }
        const cars = await findAllAvailableCarsUseCase.execute();
        return response.json(cars);
    } 
}

export { FindCarsController };