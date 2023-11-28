import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "domain/accounts/repositories/IUsersRepository";
import { deleteFile } from "utils/file";

interface IRequest {
    user_id: string;
    avatar_file: string;
}

@injectable()
class UpdateUserAvatarUseCase {

    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ) { }

    async execute({ user_id, avatar_file }:IRequest) {
        const user = await this.usersRepository.findById({id: user_id});

        if(user.avatar){
            await deleteFile(`./tmp/avatar/${user.avatar}`);
        }
        
        await this.usersRepository.UpdateAvatar({avatar_file,id: user_id}); 
    }
}

export { UpdateUserAvatarUseCase }