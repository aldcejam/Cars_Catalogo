import { ICreateUserDTO } from "DTOS/accounts/ICreateUserDTO";
import { IUsersRepository } from "domain/accounts/repositories/IUsersRepository";
import { inject, injectable } from "tsyringe";
import { hash } from "bcrypt";
import { AppError } from "@errors/AppError";

@injectable()
class CreateUserUseCase{

    constructor(
        @inject("UsersRepository")
        private userRepository: IUsersRepository
    ){}
    

    async execute({name, email, password, driver_license}: ICreateUserDTO): Promise<void>{
        const passwordHash = await hash(password, 8)

        const userAlreadyExists = await this.userRepository.findByEmail({email})
        
        if(userAlreadyExists){
            throw new AppError("User already exists")
        }

        await this.userRepository.create({
            name,
            email,
            password: passwordHash,
            driver_license
        })

    }

}

export { CreateUserUseCase }