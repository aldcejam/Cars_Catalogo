import { UsersRepository } from "@domain/accounts/repositories/UsersRepository";
import { AppError } from "@errors/AppError";
import { NextFunction, Request, Response } from "express";


export async function ensureAdmin(req: Request, res: Response, next: NextFunction){
    const { id } = req.user;

    const usersRepository = new UsersRepository();
    const user = await usersRepository.findById({id});

    if(!user.isAdmin){
        throw new AppError("User is not admin", 401);
    }

    next();
}