import { ICreateUserDTO } from "../../../../modules/accounts/dtos/ICreateUserDTO";
import { IUsersRepository } from "../../../../modules/accounts/repositories/IUsersRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class CreateUserUseCase{

    constructor(
        @inject("UsersRepository")
        private userRepository: IUsersRepository
    ){}

    async execute({name, username, email, password, driver_license}: ICreateUserDTO): Promise<void>{
        await this.userRepository.create({
            name,
            username,
            email,
            password,
            driver_license
        })

    }

}

export { CreateUserUseCase }