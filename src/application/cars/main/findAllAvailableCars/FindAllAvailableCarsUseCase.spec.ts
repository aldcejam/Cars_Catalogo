import { CarsRepositoryInMemory } from '@domain/cars/repositories/main/CarsRepositoryInMemory';
import { FindAllAvailableCarsUseCase } from "./FindAllAvailableCarsUseCase";

let findAllAvailableCarsUseCase: FindAllAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe('Find all available cars', () => {

    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        findAllAvailableCarsUseCase = new FindAllAvailableCarsUseCase(carsRepositoryInMemory);
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
        const carsList = await findAllAvailableCarsUseCase.execute();
 
        expect(carsList.length).not.toBe(0);

    });

});