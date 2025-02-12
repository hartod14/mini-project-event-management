import { responseHandler } from "@/helpers/response.handler";
import categoryService from "@/services/category.service";
import { NextFunction, Request, Response } from "express";

class CategoryController {

    async getCategories(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await categoryService.getList()
            responseHandler(res, "success get categories data", data)
        } catch (error) {
            next(error)
        }
    }
}

export default new CategoryController()