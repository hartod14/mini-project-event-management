import { ErrorHandler, responseHandler } from "@/helpers/response.handler";
import authService from "@/services/auth.service";
import { NextFunction, Request, Response } from "express";

class AuthController {
    async signIn(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await authService.signIn(req);
            responseHandler(res, "login success", data);
        } catch (error) {
            next(error);
        }
    }
}

export default new AuthController();