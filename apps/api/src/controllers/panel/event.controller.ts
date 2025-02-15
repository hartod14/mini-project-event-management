/** @format */

import { NextFunction, Request, Response } from "express";
import { ErrorHandler, responseHandler, responsHandlerPagination } from "../../helpers/response.handler";
import panelEventService from "../../services/panel/event.service";
import eventService from "../../services/panel/event.service";

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

    async createEvent(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await eventService.create(req);
            responseHandler(res, "new event has been created", data, 201);
        } catch (error) {
            next(error);
        }
    }

    async getEventById(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await eventService.getById(req);
            if (!data) throw new ErrorHandler("event not found", 404);
            responseHandler(res, "success fetching event with id", data);
        } catch (error) {
            next(error);
        }
    }

    // async deleteevent(req: Request, res: Response, next: NextFunction) {
    //     try {
    //         await panelEventService.delete(req);
    //         responseHandler(res, "event has been deleted");
    //     } catch (error) {
    //         next(error);
    //     }
    // }
}

export default new PanelEventController();
