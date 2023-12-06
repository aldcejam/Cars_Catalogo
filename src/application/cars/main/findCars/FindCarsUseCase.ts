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
    async execute({brand,category_id,name}: IFindAvailabeCarsDTO = {}): Promise<Car[]> {
        const returnNullIfEmpty = (cars: Car[]) => cars.length === 0 ? null : cars;
        if(name){
            const cars = await this.carsRepository.findAvailableByCarName(name);
            return returnNullIfEmpty(cars);
        }
        if(brand){
            const cars = await this.carsRepository.findAvailableByBrand(brand);
            return returnNullIfEmpty(cars);
        }
        if(category_id){
            const cars = await this.carsRepository.findAvailableByCategoryID(category_id);
            return returnNullIfEmpty(cars);
        } 
        const cars = await this.carsRepository.findAvailable();
        return returnNullIfEmpty(cars);
    }
}

export { FindCarsUseCase };