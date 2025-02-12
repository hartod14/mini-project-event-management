import { NextFunction, Request, Response, } from "express";

import cityService from '../services/city.service'
import { responseHandler } from "@/helpers/response.handler";

class CityController {
    async getCities(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await cityService.getList();
            responseHandler(res, "success get cities data", data)
        } catch (error) {
            next(error)
        }
    }
}

export default new CityController()