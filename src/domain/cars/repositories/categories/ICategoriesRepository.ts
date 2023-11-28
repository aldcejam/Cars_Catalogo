import { ICreateCategoryDTO } from "DTOS/cars/category/ICreateCategoryDTO";
import { Category } from "domain/cars/entities/Category";
 

interface ICategoriesRepository {
  findByName(name: string): Promise<Category>;
  list(): Promise<Category[]>;
  create({ description, name }: ICreateCategoryDTO): Promise<void>;
}

export { ICategoriesRepository };
