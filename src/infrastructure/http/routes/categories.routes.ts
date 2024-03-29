import { Router } from "express";
import multer from "multer";

import { CreateCategoryController } from "@application/cars/category/createCategory/CreateCategoryController";
import { ListCategoriesController } from "@application/cars/category/listCategories/ListCategoriesController";
import { ImportCategoryController } from "@application/cars/category/importCategory/ImportCategoryController";

const categoriesRoutes = Router();

const upload = multer({
  dest: "./tmp"
})

const createCategoryController = new CreateCategoryController();
categoriesRoutes.post("/", createCategoryController.handle);

const listCategoriesController = new ListCategoriesController();
categoriesRoutes.get("/", listCategoriesController.handle)

const importCategoryController = new ImportCategoryController();
categoriesRoutes.post("/import", upload.single("file"),importCategoryController.handle)

export { categoriesRoutes }; 