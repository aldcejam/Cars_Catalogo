import { container } from "tsyringe";
import { CategoriesRepository } from "domain/cars/repositories/categories/CategoriesRepository";
import { ICategoriesRepository } from "domain/cars/repositories/categories/ICategoriesRepository";
import { SpecificationsRepository } from "domain/cars/repositories/specifications/SpecificationsRepository";
import { ISpecificationsRepository } from "domain/cars/repositories/specifications/ISpecificationsRepository";
import { UsersRepository } from "domain/accounts/repositories/UsersRepository";
import { IUsersRepository } from "domain/accounts/repositories/IUsersRepository";

container.registerSingleton<ICategoriesRepository>(
    "CategoriesRepository",
    CategoriesRepository
)

container.registerSingleton<ISpecificationsRepository>(
    "SpecificationsRepository",
    SpecificationsRepository
)

container.registerSingleton<IUsersRepository>(
    "UsersRepository",
    UsersRepository
)