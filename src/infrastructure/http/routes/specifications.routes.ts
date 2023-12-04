import { Router } from "express"; 
import { CreateSpecificationController } from "@application/cars/specifications/createSpecification/CreateSpecificationController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
 
const specificationsRoutes = Router();
 
const createSpecificationController = new CreateSpecificationController();
specificationsRoutes.use(ensureAuthenticated);
specificationsRoutes.post("/", createSpecificationController.handle);
 

export {specificationsRoutes}