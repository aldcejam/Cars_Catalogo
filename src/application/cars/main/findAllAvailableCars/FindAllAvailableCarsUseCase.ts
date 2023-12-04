import { Car } from "@domain/cars/entities/Car";
import { ICarsRepository } from "@domain/cars/repositories/main/ICarsRepository";


class FindAllAvailableCarsUseCase {
    constructor(
        private carsRepository: ICarsRepository
    ) {}
    async execute(): Promise<Car[]> {
        const cars = await this.carsRepository.findAvailable();
        return cars;
    }
}

export { FindAllAvailableCarsUseCase };