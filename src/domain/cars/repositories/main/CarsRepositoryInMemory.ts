import { Car } from "@domain/cars/entities/Car";
import { ICreateCarDTO } from "DTOS/cars/CreateCarDTO";
import { ICarsRepository } from "./ICarsRepository";

class CarsRepositoryInMemory implements ICarsRepository {
  private cars: Car[] = [];

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

    this.cars.push(car); 

    return car;
  }

    async findByLicensePlate(license_plate: string): Promise<Car> {
        return this.cars.find((car) => car.license_plate === license_plate);
    }

    async findAvailable(): Promise<Car[]> {
        const cars = this.cars.filter((car) => car.available === true);
        return cars;
    }
}

export { CarsRepositoryInMemory }; 