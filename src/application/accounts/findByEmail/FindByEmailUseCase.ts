import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "domain/accounts/repositories/IUsersRepository";
import { IFindByEmailDTO } from "DTOS/accounts/IFindByEmailDTO";


@injectable()
class FindByEmailUseCase {
  constructor(
    @inject("UsersRepository")
    private userRepository: IUsersRepository
  ) {}

  async execute({ email }: IFindByEmailDTO) {
    const user = await this.userRepository.findByEmail({email});
    return {
      name: user.name,
      email: user.email,
    };
  }
}

export { FindByEmailUseCase };