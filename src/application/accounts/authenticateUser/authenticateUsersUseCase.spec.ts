import { AppError } from "@errors/AppError";
import { UserRepositoryInMemory } from "@domain/accounts/repositories/UserRepositoryInMemory";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./authenticateUserUseCase";

let authenticateUserUseCase: AuthenticateUserUseCase;
let userRepositoryInMemory: UserRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe('Authenticate User', () => {
    beforeEach(() => {
        userRepositoryInMemory = new UserRepositoryInMemory();
        authenticateUserUseCase = new AuthenticateUserUseCase(userRepositoryInMemory);
        createUserUseCase = new CreateUserUseCase(userRepositoryInMemory);
    });

    const user = {
        name: 'User Test',
        email: 'user_test@gmail.com',
        password: '1234',
        driver_license: '000123',
    };
    it('should be able to authenticate an user', async () => {

        await createUserUseCase.execute(user);

        const result = await authenticateUserUseCase.execute({
            email: user.email,
            password: user.password,
        });

        expect(result).toHaveProperty('token');
    });

    it('should not be able to authenticate an nonexistent user', async () => {
        await expect(
            authenticateUserUseCase.execute({
                email: user.email,
                password: user.password,
            })
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to authenticate with incorrect email', async () => {
        await createUserUseCase.execute(user);

        await expect(
            authenticateUserUseCase.execute({
                email: 'incorrectEmail',
                password: user.password,
            })
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to authenticate with incorrect password', async () => {
        await createUserUseCase.execute(user);

        await expect(
            authenticateUserUseCase.execute({
                email: user.email,
                password: 'incorrectPassword',
            })
        ).rejects.toBeInstanceOf(AppError);
    });
});