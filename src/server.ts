import express from 'express';
import "reflect-metadata";

import swaggerUi from 'swagger-ui-express';
import { AppDataSource } from './database';
import "./shared/container"
import { router } from './routes';
import swaggerFile from './swagger.json';
import { AppError } from './errors/AppError';

AppDataSource.initialize().then(async ()=>{
    const app = express();
    app.listen(3333)
    
    app.use(express.json())
    
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile))
    app.use(router)

    app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction)=>{
        if(err instanceof AppError){
            return res.status(err.statusCode).json({
                error: err.message
            })
        }   
    })
    
    app.get("/", (req, res) => {
        return res.send()
    })
    
})


