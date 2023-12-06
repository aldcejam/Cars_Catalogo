import { CarsRepositoryInMemory } from '@domain/cars/repositories/main/CarsRepositoryInMemory';
import { FindCarsUseCase } from "./FindCarsUseCase";
import { ICreateCarDTO } from 'DTOS/cars/ICreateCarDTO';

let findCarsUseCase: FindCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe('Find Cars', () => {

    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        findCarsUseCase = new FindCarsUseCase(carsRepositoryInMemory);
    });

    let car: ICreateCarDTO = {
        name: 'Car 1',
        description: 'Car description',
        daily_rate: 100,
        license_plate: 'ABC-1234',
        fine_amount: 60,
        brand: 'Car brand',
        category_id: 'category_id'
    }

    it('should be able to list all available cars', async () => {
        const carCreated1 = await carsRepositoryInMemory.create(car); 
        const carCreated2 = await carsRepositoryInMemory.create({...car, license_plate:"332"});
        const carsList = await findCarsUseCase.execute();
 
        expect(carsList[0].available).toBe(carCreated1.available);
        expect(carsList[1].available).toBe(carCreated2.available);

    });

    it("should be able to list all available cars by brand", async () => {
        const expectedBrand = "fiate";
        await carsRepositoryInMemory.create({...car,brand: expectedBrand});
        await carsRepositoryInMemory.create({...car,brand:"ferrari"});
        const carsList = await findCarsUseCase.execute({brand: expectedBrand});
 
        expect(carsList.length).toBe(1); 
        expect(carsList[0].brand).toBe(expectedBrand); 
    })

    it("should be able to list all available cars by name", async () => {
        const expectedName = "car 1";
        await carsRepositoryInMemory.create({...car,name: expectedName});
        await carsRepositoryInMemory.create({...car,name:"car 2"});
        const carsList = await findCarsUseCase.execute({name: expectedName});
 
        expect(carsList.length).toBe(1); 
        expect(carsList[0].name).toBe(expectedName); 
    })

    it("should be able to list all available cars by category id", async () => {
        const expectedCategoryID = "category_id";
        await carsRepositoryInMemory.create({...car,category_id: expectedCategoryID});
        await carsRepositoryInMemory.create({...car,category_id:"category_id2"});
        const carsList = await findCarsUseCase.execute({category_id: expectedCategoryID});
 
        expect(carsList.length).toBe(1); 
        expect(carsList[0].category_id).toBe(expectedCategoryID); 
    })

    it("should be able null if no car is found", async () => {
        const carsList = await findCarsUseCase.execute({category_id: "invalid_id"});
        expect(carsList).toBe(null);
    })

});