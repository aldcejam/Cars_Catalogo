import { Repository } from "typeorm";
import { Category } from "../../entities/Category";
import { AppDataSource } from "@shared/typeorm";
import { ICreateCategoryDTO } from "DTOS/cars/category/ICreateCategoryDTO";
import { ICategoriesRepository } from "./ICategoriesRepository";

class CategoriesRepository implements ICategoriesRepository {
  private categories: Repository<Category>;
  
  constructor() { 
    this.categories = AppDataSource.getRepository(Category);
  }
  
  async create({ name, description }: ICreateCategoryDTO): Promise<void> {
    const category =  Object.assign(new Category(),{
      name,
      description
    });

    await this.categories.save(category);
  }

  async list(): Promise<Category[]> {
    const categories = await this.categories.find(); 
    return categories;
  }

  async findByName(name: string): Promise<Category> {
    const category = await this.categories.findOne({where: { name }});
    return category;
  }
}

export { CategoriesRepository };
