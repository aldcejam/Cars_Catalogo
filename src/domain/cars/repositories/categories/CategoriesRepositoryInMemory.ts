import { Category } from "../../entities/Category";
import { ICreateCategoryDTO } from "DTOS/cars/category/ICreateCategoryDTO";
import { ICategoriesRepository } from "./ICategoriesRepository";

class CategoriesRepositoryInMemory implements ICategoriesRepository{
  
    categories: Category[] = []
   
    async findByName(name: string): Promise<Category> {
        const category = this.categories.find((category) => category.name === name);
        return category;
    }
    async list(): Promise<Category[]> {
        const all = this.categories;
        return all;
    }
    async create({ description, name }: ICreateCategoryDTO): Promise<void> {
        const category =  Object.assign(new Category(),{
            name,
            description
        });
        
        this.categories.push(category);
    }
}

export { CategoriesRepositoryInMemory };