import { inject, injectable } from "tsyringe";
import { Category } from "domain/cars/entities/Category";
import { ICategoriesRepository } from "domain/cars/repositories/categories/ICategoriesRepository";

@injectable()
class ListCategoriesUseCase {

    constructor(
        @inject("CategoriesRepository")
        private categoriesRepository: ICategoriesRepository
    ){}

    async execute(): Promise<Category[]>{
        const categories = await this.categoriesRepository.list()
    
        return categories
    }

}

export {ListCategoriesUseCase}