
import { NextFunction, Request, Response } from 'express';
import { ErrorHandler, responseHandler } from '../helpers/response.handler';
import bookingService from '@/services/booking.service';

class bookingController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      await bookingService.create(req);
      responseHandler(res, 'new booking has been created', undefined, 201);
    } catch (error) {
      next(error);
    }
  }
}
export default new bookingController();
