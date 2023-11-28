import { Router } from "express";
import multer from "multer";

import { CreateCategoryController } from "@infra/controllers/cars/categories/CreateCategoryController";
import { ListCategoriesController } from "@infra/controllers/cars/categories/ListCategoriesController";
import { ImportCategoryController } from "@infra/controllers/cars/categories/ImportCategoryController";

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