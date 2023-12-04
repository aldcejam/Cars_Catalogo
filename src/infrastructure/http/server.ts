import express, { NextFunction, Request, Response } from 'express';
import "express-async-errors";
import "reflect-metadata";

import swaggerUi from 'swagger-ui-express';
import { AppDataSource } from '@shared/typeorm';
import "@shared/container"
import { router } from '@infra/http/routes';
import swaggerFile from '../../swagger.json';
import { AppError } from '@errors/AppError'; 

AppDataSource.initialize().then(async ()=>{
    const app = express();
    app.listen(3333)
    
    app.use(express.json())
    
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile))
    app.use(router)

    app.use((err: Error, req: Request, res: Response, next: NextFunction)=>{
        if(err instanceof AppError){
            return res.status(err.statusCode).json({
                error: err.message
            })
        }   

        return res.status(500).json({
            status: "error",
            message: `Internal server error - ${err.message}`
        })
    })
    
    app.get("/", (req, res) => {
        return res.send()
    })
  
})


