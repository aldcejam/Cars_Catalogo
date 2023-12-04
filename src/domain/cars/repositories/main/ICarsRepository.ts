import { Car } from "@domain/cars/entities/Car";
import { ICreateCarDTO } from "DTOS/cars/CreateCarDTO";

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

}

export { ICarsRepository };