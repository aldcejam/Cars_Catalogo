import { ICreateCarDTO } from "DTOS/cars/CreateCarDTO";
import { CreateCarUseCase } from "./CreateCarUseCase";
import { CarsRepositoryInMemory } from "@domain/cars/repositories/main/CarsRepositoryInMemory";
import { AppError } from "@errors/AppError";

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create Car", () => {

    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
    });

    const car: ICreateCarDTO = {
        name: "Car Name",
        description: "Car Description",
        daily_rate: 100,
        license_plate: "ABC-1234",
        fine_amount: 60,
        brand: "Car Brand",
        category_id: "category_id",
    };

    it("should be able to create a new car", async () => {
        const carCreated = await createCarUseCase.execute(car);
        
        expect(carCreated).toHaveProperty("id");
    });

    it("should not be able to create a car with exists license plate", async () => {
        expect(async () => {
            await createCarUseCase.execute({name: "toyota", ...car});
            await createCarUseCase.execute({name: "fiat", ...car});
        }).rejects.toBeInstanceOf(AppError);
    });

    it("should not be able to create a car with available true by default", async () => {
        const carCreated = await createCarUseCase.execute(car);
        
        expect(carCreated.available).toBe(true);
    })

});