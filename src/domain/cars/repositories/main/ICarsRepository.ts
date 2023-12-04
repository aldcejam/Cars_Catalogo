import { Car } from "@domain/cars/entities/Car";
import { ICreateCarDTO } from "DTOS/cars/ICreateCarDTO";

interface ICarsRepository {
    create({
        brand,
        category_id,
        daily_rate,
        description,
        fine_amount,
        license_plate,
        name,
    }: ICreateCarDTO): Promise<Car>;

    findByLicensePlate(license_plate: string): Promise<Car>;
    findAvailable(): Promise<Car[]>;
    findAvailableByBrand(brand: string): Promise<Car[]>;
    findAvailableByCarName(car_name: string): Promise<Car[]>;
    findAvailableByCategoryID(category_id: string): Promise<Car[]>;
}

export { ICarsRepository };