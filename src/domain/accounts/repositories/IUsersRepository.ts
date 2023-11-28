import { ICreateUserDTO } from "DTOS/accounts/ICreateUserDTO";
import { IFindByEmailDTO } from "DTOS/accounts/IFindByEmailDTO";
import { IFindByIdDTO } from "DTOS/accounts/IFindByIdDTO";
import { IUpdateAvatarDTO } from "DTOS/accounts/IUpdateAvatarDTO";
import { User } from "domain/accounts/entities/User";


interface IUsersRepository {
    create(data: ICreateUserDTO): Promise<void>;
    findByEmail({email}:IFindByEmailDTO): Promise<User>;
    findById({id}: IFindByIdDTO): Promise<User>;
    UpdateAvatar({id, avatar_file}: IUpdateAvatarDTO): Promise<void>;
} 

export { IUsersRepository }