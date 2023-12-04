import { AppError } from "@errors/AppError";
import { CategoriesRepositoryInMemory } from "../../../../domain/cars/repositories/categories/CategoriesRepositoryInMemory";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

let createCategory: CreateCategoryUseCase;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;

describe("Create Category", () => {

    beforeEach(() => {
        categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
        createCategory = new CreateCategoryUseCase(categoriesRepositoryInMemory);
    });
    
    const category = {
        name: "Category Test",
        description: "Category description Test"
    };

    it("should be able to create a new category", async () => {
         
        await createCategory.execute({
            name: category.name,
            description: category.description
        });

        const categoryCreated = await categoriesRepositoryInMemory.findByName(category.name);

        expect(categoryCreated).toHaveProperty("id");
    });
    it("should not be able to create a new category with name exists", async () => {
        expect(async () => { 
    
            await createCategory.execute(category);
            await createCategory.execute(category);

        }).rejects.toBeInstanceOf(AppError);
    });
});