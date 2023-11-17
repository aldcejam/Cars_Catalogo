import express from 'express';
import "reflect-metadata";

import swaggerUi from 'swagger-ui-express';
import { AppDataSource } from './database';
import "./shared/container"
import { router } from './routes';
import swaggerFile from './swagger.json';

AppDataSource.initialize().then(async ()=>{
    const app = express();
    app.listen(3333)
    
    app.use(express.json())
    
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile))
    app.use(router)
    
    app.get("/", (req, res) => {
        return res.send()
    })
    
})


