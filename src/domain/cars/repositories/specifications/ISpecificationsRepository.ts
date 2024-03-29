import { ICreateSpecificationDTO } from "DTOS/cars/specification/ICreateSpecification";
import { Specification } from "../../entities/Specification";
 
interface ISpecificationsRepository {
  create({ name, description }: ICreateSpecificationDTO): Promise<void>;
  findByName(name: string): Promise<Specification>;
  list(): Promise<Specification[]>;
}

export { ISpecificationsRepository };
