import { CreateCarController } from "@application/cars/main/createCar/CreateCarController"
import { Router } from "express";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { ensureAdmin } from "../middlewares/ensureAdmin"; 
import { FindCarsController } from "@application/cars/main/findCars/FindCarsController";

const carsRoutes = Router();

const createCarController = new CreateCarController();
carsRoutes.post(
    "/",
    ensureAuthenticated,
    ensureAdmin,
    createCarController.handle
);

const findCarsController = new FindCarsController()
carsRoutes.get(
    "/",
    findCarsController.handle
);


export { carsRoutes }