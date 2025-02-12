/** @format */

import { NextFunction, Request, Response } from "express";
import { ErrorHandler, responseHandler, responsHandlerPagination } from "../../helpers/response.handler";
import panelEventService from "../../services/panel/event.service";

class PanelEventController {
    async getEvents(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await panelEventService.getList(req);
            const total_data = await panelEventService.countTotal(req)
            responsHandlerPagination(res, "success get events data", data, total_data);
        } catch (error) {
            next(error);
        }
    }

    async deleteevent(req: Request, res: Response, next: NextFunction) {
        try {
            await panelEventService.delete(req);
            responseHandler(res, "event has been deleted");
        } catch (error) {
            next(error);
        }
    }
}

export default new PanelEventController();
