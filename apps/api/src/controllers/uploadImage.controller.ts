/** @format */

import { NextFunction, Request, Response } from "express";
import { ErrorHandler, responseHandler, responsHandlerPagination } from "../helpers/response.handler";
import uploadImageService from "@/services/uploadImage.service";

class UploadImageController {

    async uploadImage(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await uploadImageService.uploadImage(req);
            responseHandler(res, "upload image success",data);
        } catch (error) {
            next(error);
        }
    }
}

export default new UploadImageController();
