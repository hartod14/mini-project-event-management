/** @format */

import { NextFunction, Request, Response } from "express";
import { ErrorHandler, responseHandler } from "../../helpers/response.handler";
import panelEventService from "../../services/panel/event.service";

class PanelEventController {
    // async createProduct(req: Request, res: Response, next: NextFunction) {
    //     try {
    //         await productService.create(req);
    //         responseHandler(res, "new product has been created", undefined, 201);
    //     } catch (error) {
    //         next(error);
    //     }
    // }
    // async updateProduct(req: Request, res: Response, next: NextFunction) {
    //     try {
    //         await productService.update(req);
    //         responseHandler(res, "new product has been updated");
    //     } catch (error) {
    //         next(error);
    //     }
    // }

    // async deleteProduct(req: Request, res: Response, next: NextFunction) {
    //     try {
    //         await productService.delete(req);
    //         responseHandler(res, "product has been deleted");
    //     } catch (error) {
    //         next(error);
    //     }
    // }

    async getEvents(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await panelEventService.getList(req);
            responseHandler(res, "success fetching event datas", data);
        } catch (error) {
            next(error);
        }
    }

    // async getProductBySlug(req: Request, res: Response, next: NextFunction) {
    //     try {
    //         const data = await productService.getBySlug(req);
    //         if (!data) throw new ErrorHandler("product not found", 404);
    //         responseHandler(res, "fetching product with slug", data);
    //     } catch (error) {
    //         next(error);
    //     }
    // }
}

export default new PanelEventController();
