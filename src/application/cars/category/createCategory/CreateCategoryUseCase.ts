import { AppError } from "@errors/AppError";
import { inject, injectable } from "tsyringe";
import { ICategoriesRepository } from "domain/cars/repositories/categories/ICategoriesRepository";
import { ICreateCategoryDTO } from "DTOS/cars/category/ICreateCategoryDTO";
 
@injectable()
class CreateCategoryUseCase { 
  constructor(
    @inject("CategoriesRepository")
    private categoriesRepository: ICategoriesRepository
    ){}

  async execute({ name, description }: ICreateCategoryDTO): Promise<void> {
    const categoryAlreadyExists = await this.categoriesRepository.findByName(name);
    if (categoryAlreadyExists) {
      throw new AppError("Category Already exists");
    }
 
    await this.categoriesRepository.create({
      name,
      description,
    });
  }
}

export { CreateCategoryUseCase };
