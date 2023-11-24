import { inject, injectable } from "tsyringe";
import { UsersRepository } from "../../repositories/implements/UsersRepository";
import { IFindByIdDTO } from "../../dtos/IFindByIdDTO";
import { AppError } from "../../../../errors/AppError";

@injectable()
class FindbyIdUseCase {

    constructor(
        @inject('UsersRepository')
        private usersRepository: UsersRepository
    ) {}
    
    async execute({id}: IFindByIdDTO) {
        const user = await this.usersRepository.findById({id});
    
        if (!user) {
            throw new AppError('user not found');
        }
    
        return {
            name: user.name,
            email: user.email,
        };
    }
}

export { FindbyIdUseCase };