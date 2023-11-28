import { AppDataSource } from "@infra/typeorm";
import { Repository } from "typeorm";
import { User } from "../entities/User";
import { IUsersRepository } from "@application/accounts/repositories/IUsersRepository";
import { ICreateUserDTO } from "DTOS/accounts/ICreateUserDTO";
import { IFindByEmailDTO } from "DTOS/accounts/IFindByEmailDTO";
import { IFindByIdDTO } from "DTOS/accounts/IFindByIdDTO";
import { IUpdateAvatarDTO } from "DTOS/accounts/IUpdateAvatarDTO";

class UsersRepository implements IUsersRepository{

    private repository: Repository<User>

    constructor(){
        this.repository = AppDataSource.getRepository(User)
    }

    async create({
        name, 
        email,
        password,
        driver_license, 
    }: ICreateUserDTO): Promise<void> {
        const user = Object.assign(new User(),{
            name, 
            email,
            password,
            driver_license, 
        })

        await this.repository.save(user)
    }

    async UpdateAvatar({id, avatar_file}: IUpdateAvatarDTO): Promise<void> {
        const user = await this.repository.findOne({where: {id}})

        user.avatar = avatar_file

        await this.repository.save(user)
    }

    async findByEmail({email}: IFindByEmailDTO): Promise<User> {
        const user = await this.repository.findOne({where: {email}})

        return user
    }

    async findById({id}: IFindByIdDTO): Promise<User> {
        const user = await this.repository.findOne({where: {id}})

        return user
    }

}

export { UsersRepository }