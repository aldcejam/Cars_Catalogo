import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { UsersRepository } from "../modules/accounts/repositories/implements/UsersRepository";
import { AppError } from "../errors/AppError";

interface IPayload{
    sub: string;
}

export async function ensureAuthenticated(req: Request, res: Response, next: NextFunction){
    const authHeader = req.headers.authorization;

    if(!authHeader){
        throw new AppError("Token missing", 401);
    }

    const [, token] = authHeader.split(" ");

    try{
        const { sub: user_id } = verify(token, "1c680feabbd639957e47215b3ac9bc11") as IPayload;
        
        const usersRepository = new UsersRepository();
        const user = await usersRepository.findById({id:user_id});
        
        if(!user){
            throw new AppError("User does not exist", 401);
        }

        req.user = {
            id: user_id
        }

        next();
    }
    catch{
        throw new AppError("Invalid token", 401);
    }
}