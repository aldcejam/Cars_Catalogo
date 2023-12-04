import { Car } from "@domain/cars/entities/Car";
import { ICreateCarDTO } from "DTOS/cars/CreateCarDTO";
import { ICarsRepository } from "./ICarsRepository";
import { Repository } from "typeorm";
import { AppDataSource } from "@shared/typeorm";

class CarsRepository implements ICarsRepository {

    private cars: Repository<Car>;

    constructor(){
        this.cars = AppDataSource.getRepository(Car);
    }

    async create({
        name,
        description,
        daily_rate,
        license_plate,
        fine_amount,
        brand,
        category_id,
    }: ICreateCarDTO): Promise<Car> {

        const car = Object.assign(new Car, {
            name,
            description,
            daily_rate,
            license_plate,
            fine_amount,
            brand,
            category_id,
        });

        await this.cars.save(car);

        return car;
    }

    async findByLicensePlate(license_plate: string): Promise<Car> {
        return await this.cars.findOne({where: { license_plate }});
    }

    async findAvailable(): Promise<Car[]> {
        const cars = await this.cars.find({where: { available: true }});
        return cars;
    }
}

export { CarsRepository }