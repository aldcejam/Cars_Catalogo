import { Car } from "@domain/cars/entities/Car";
import { ICarsRepository } from "@domain/cars/repositories/main/ICarsRepository";
import { IFindAvailabeCarsDTO } from "DTOS/cars/IFindAvailabeCarsDTO";
import { inject, injectable } from "tsyringe";


@injectable()
class FindCarsUseCase {
    constructor(
        @inject("CarsRepository")
        private carsRepository: ICarsRepository
    ) {}
    async execute({brand,category_id,name}:IFindAvailabeCarsDTO): Promise<Car[]> {
        if(name){
            const cars = await this.carsRepository.findAvailableByCarName(name);
            return cars;
        }
        if(brand){
            const cars = await this.carsRepository.findAvailableByBrand(brand);
            return cars;
        }
        if(category_id){
            const cars = await this.carsRepository.findAvailableByCategoryID(category_id);
            return cars;
        } 
        const cars = await this.carsRepository.findAvailable();
        return cars;
    }
}

export { FindCarsUseCase };