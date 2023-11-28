import { inject, injectable } from "tsyringe";
import { ISpecificationsRepository } from "domain/cars/repositories/specifications/ISpecificationsRepository";
import { AppError } from "@errors/AppError";
import { ICreateSpecificationDTO } from "DTOS/cars/specification/ICreateSpecification";
  
@injectable()
class CreateSpecificationUseCase {
  constructor(
    @inject("SpecificationsRepository")
    private specificationsRepository: ISpecificationsRepository
  ) {}

  async execute({ name, description }: ICreateSpecificationDTO) {
    const specificationAlreadyExists =
      await this.specificationsRepository.findByName(name);

    if (specificationAlreadyExists) {
      throw new AppError("specification already Exists");
    }
    await this.specificationsRepository.create({
      name,
      description,
    });
  }
}

export { CreateSpecificationUseCase };
