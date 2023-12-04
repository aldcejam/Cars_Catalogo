import { CarsRepositoryInMemory } from '@domain/cars/repositories/main/CarsRepositoryInMemory';
import { FindCarsUseCase } from "./FindCarsUseCase";

let findAllAvailableCarsUseCase: FindCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe('Find all available cars', () => {

    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        findAllAvailableCarsUseCase = new FindCarsUseCase(carsRepositoryInMemory);
    });


    it('should be able to list all available cars', async () => {
        
        const car = await carsRepositoryInMemory.create({
            name: 'Car 1',
            description: 'Car description',
            daily_rate: 100,
            license_plate: 'ABC-1234',
            fine_amount: 60,
            brand: 'Car brand',
            category_id: 'category_id'
        });
        const carsList = await findAllAvailableCarsUseCase.execute({
            name: ""
        });
 
        expect(carsList.length).not.toBe(0);

    });

});