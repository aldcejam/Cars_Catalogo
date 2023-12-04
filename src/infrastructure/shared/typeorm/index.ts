import { DataSource } from "typeorm"
import { Category } from "@domain/cars/entities/Category"
import { Specification } from "@domain/cars/entities/Specification"
import { User } from "@domain/accounts/entities/User"
import { Car } from "@domain/cars/entities/Car"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost", 
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "rentx",  
    synchronize: true,
    subscribers: [],
    migrations: ["./migrations/*.ts"],
    entities: [Category, Specification, User, Car], 
}) 