import { Router } from "express";
import createCategoryController from "../modules/cars/useCases/createCategory";
import listCategoriesController from "../modules/cars/useCases/listCategories";

const specificationsRoutes = Router();


specificationsRoutes.post("/", (req, res) => {
  createCategoryController().handle(req,res)
});

specificationsRoutes.get("/",(req,res)=>{
  return listCategoriesController().handle(req, res)
})

export {specificationsRoutes}