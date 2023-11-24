import { AppDataSource } from "../../../../database";
import { Repository } from "typeorm";
import { User } from "../../entities/User";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { IUsersRepository } from "../IUsersRepository";
import { IFindByEmailDTO } from "../../dtos/IFindByEmailDTO";
import { IFindByIdDTO } from "../../dtos/IFindByIdDTO";
import { IUpdateAvatarDTO } from "../../dtos/IUpdateAvatarDTO";

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