import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { IFindByEmailDTO } from "../dtos/IFindByEmailDTO";
import { IFindByIdDTO } from "../dtos/IFindByIdDTO";
import { IUpdateAvatarDTO } from "../dtos/IUpdateAvatarDTO";
import { User } from "../entities/User";


interface IUsersRepository {
    create(data: ICreateUserDTO): Promise<void>;
    findByEmail({email}:IFindByEmailDTO): Promise<User>;
    findById({id}: IFindByIdDTO): Promise<User>;
    UpdateAvatar({id, avatar_file}: IUpdateAvatarDTO): Promise<void>;
} 

export { IUsersRepository }