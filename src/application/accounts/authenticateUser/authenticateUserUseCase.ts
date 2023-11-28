import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "domain/accounts/repositories/IUsersRepository";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { AppError } from "@errors/AppError";
import { IAuthenticateUserUseCaseDTO } from "DTOS/accounts/IAuthenticateUserUseCaseDTO";
 

interface IResponse{
    user: {
        name: string;
        email: string;
    },
    token: string;
}

@injectable()
class AuthenticateUserUseCase{

    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ){}

    async execute({email, password}: IAuthenticateUserUseCaseDTO): Promise<IResponse>{
        
        const user = await this.usersRepository.findByEmail({email});

        if(!user){
            throw new AppError("Email or password incorrect");
        }
  
        const passwordMatch = await compare(password, user.password);
    
        if(!passwordMatch){
            throw new AppError("Email or password incorrect");
        }

        const token = sign({},"1c680feabbd639957e47215b3ac9bc11",{
            subject: user.id,
            expiresIn: "1d"
        });

        return {
            user: {
                name: user.name,
                email: user.email
            },
            token
        }
        
    }
}

export { AuthenticateUserUseCase }