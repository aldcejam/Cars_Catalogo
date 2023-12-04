import { Car } from "@domain/cars/entities/Car";
import { ICarsRepository } from "@domain/cars/repositories/main/ICarsRepository";
import { AppError } from "@errors/AppError";
import { ICreateCarDTO } from "DTOS/cars/CreateCarDTO";
import { inject, injectable } from "tsyringe";


@injectable()
class CreateCarUseCase {
  constructor( 
    @inject("CarsRepository")
    private carsRepository: ICarsRepository) {}

  async execute({
    name,
    description,
    daily_rate,
    license_plate,
    fine_amount,
    brand,
    category_id,
  }: ICreateCarDTO): Promise<Car> {
    const carAlreadyExists = await this.carsRepository.findByLicensePlate(
      license_plate
    );

    if (carAlreadyExists) {
      throw new AppError("Car already exists!");
    }

    const car = await this.carsRepository.create({
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category_id,
    });

    return car;
  }
}

export { CreateCarUseCase };