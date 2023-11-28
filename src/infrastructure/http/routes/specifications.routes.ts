import { Router } from "express"; 
import { CreateSpecificationController } from "@infra/controllers/cars/specifications/CreateSpecificationController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
 
const specificationsRoutes = Router();
 
const createSpecificationController = new CreateSpecificationController();
specificationsRoutes.use(ensureAuthenticated);
specificationsRoutes.post("/", createSpecificationController.handle);
 

export {specificationsRoutes}