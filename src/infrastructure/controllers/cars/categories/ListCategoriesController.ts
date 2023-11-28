import { Request, Response } from "express";
import { ListCategoriesUseCase } from "@application/cars/category/listCategories/ListCategoriesUseCase";
import { container } from "tsyringe";

class ListCategoriesController {
  
  async handle(req: Request, res: Response) {

    const listCategoriesUseCase = container.resolve(ListCategoriesUseCase);

    const all = await listCategoriesUseCase.execute();

    return res.json(all);
  }
}

export { ListCategoriesController }
