import { ICreateUserDTO } from "DTOS/accounts/ICreateUserDTO";
import { IFindByEmailDTO } from "DTOS/accounts/IFindByEmailDTO";
import { IFindByIdDTO } from "DTOS/accounts/IFindByIdDTO";
import { IUpdateAvatarDTO } from "DTOS/accounts/IUpdateAvatarDTO";
import { User } from "domain/accounts/entities/User";
import { IUsersRepository } from "./IUsersRepository";

class UserRepositoryInMemory implements IUsersRepository {
  users: User[] = [];

  async create({
    driver_license,
    email,
    name,
    password,
  }: ICreateUserDTO): Promise<void> {
    const user = Object.assign(new User(), {
      driver_license,
      email,
      name,
      password,
    });

    this.users.push(user);
  }

  async findByEmail({email}: IFindByEmailDTO): Promise<User> {
    const user = this.users.find((user) => user.email == email)
    return user;
  }

  async findById({id}: IFindByIdDTO): Promise<User> {
    const user = this.users.find((user) => user.id === id);
    return user;
  }

  UpdateAvatar({ id, avatar_file }: IUpdateAvatarDTO): Promise<void> {
    const user = this.users.find((user) => user.id === id)
    user.avatar = avatar_file;
         
    return Promise.resolve();
  }
}

export { UserRepositoryInMemory };