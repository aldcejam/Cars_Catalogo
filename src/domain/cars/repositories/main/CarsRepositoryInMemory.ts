import { Car } from "@domain/cars/entities/Car";
import { ICreateCarDTO } from "DTOS/cars/ICreateCarDTO";
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
        return this.cars.filter((car) => car.available === true);
    }
    async findAvailableByBrand(brand: string): Promise<Car[]> {
        const carsAvailable = await this.findAvailable();
        const cars = carsAvailable.filter((car) => car.brand === brand);
        return cars;
    }
    async findAvailableByCarName(car_name: string): Promise<Car[]> {  
        const carsAvailable = await this.findAvailable();
        const cars = carsAvailable.filter((car) => car.name === car_name);
        return cars;
    }
    async findAvailableByCategoryID(category_id: string): Promise<Car[]> { 
        const carsAvailable = await this.findAvailable();
        const cars = carsAvailable.filter((car) => car.category_id === category_id);
        return cars;
    }

}

export { CarsRepositoryInMemory }; 