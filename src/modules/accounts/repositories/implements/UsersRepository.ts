import { AppDataSource } from "../../../../database";
import { Repository } from "typeorm";
import { User } from "../../entities/User";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { IUsersRepository } from "../IUsersRepository";

class UsersRepository implements IUsersRepository{

    private repository: Repository<User>

    constructor(){
        this.repository = AppDataSource.getRepository(User)
    }

    async create({
        name,
        username,
        email,
        password,
        driver_license
    }: ICreateUserDTO): Promise<void> {
        const user = Object.assign(new User(),{
            name,
            username,
            email,
            password,
            driver_license
        })

        await this.repository.save(user)
    }
}

export { UsersRepository }