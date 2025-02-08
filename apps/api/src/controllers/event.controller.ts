/** @format */

import { NextFunction, Request, Response } from "express";
import { ErrorHandler, responseHandler } from "../helpers/response.handler";
import eventService from "../services/event.service";

class eventController {
  async createevent(req: Request, res: Response, next: NextFunction) {
    try {
      await eventService.create(req);
      responseHandler(res, "new event has been created", undefined, 201);
    } catch (error) {
      next(error);
    }
  }
  async updateevent(req: Request, res: Response, next: NextFunction) {
    try {
      await eventService.update(req);
      responseHandler(res, "new event has been updated");
    } catch (error) {
      next(error);
    }
  }

  async deleteevent(req: Request, res: Response, next: NextFunction) {
    try {
      await eventService.delete(req);
      responseHandler(res, "event has been deleted");
    } catch (error) {
      next(error);
    }
  }

  async getevents(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await eventService.getList(req);
      responseHandler(res, "fetching events", data);
    } catch (error) {
      next(error);
    }
  }

  async geteventBySlug(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await eventService.getBySlug(req);
      if (!data) throw new ErrorHandler("event not found", 404);
      responseHandler(res, "fetching event with slug", data);
    } catch (error) {
      next(error);
    }
  }
}

export default new eventController();
