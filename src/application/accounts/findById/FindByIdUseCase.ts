import { inject, injectable } from "tsyringe";
import { UsersRepository } from "domain/accounts/repositories/UsersRepository";
import { IFindByIdDTO } from "DTOS/accounts/IFindByIdDTO";
import { AppError } from "@errors/AppError";

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