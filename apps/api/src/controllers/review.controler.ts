/** @format */

import { NextFunction, Request, Response } from 'express';
import { ErrorHandler, responseHandler } from '../helpers/response.handler';
import reviewService from '../services/review.service';

class reviewController {
  async createreview(req: Request, res: Response, next: NextFunction) {
    try {
      await reviewService.create(req);
      responseHandler(res, 'new review has been created', undefined, 201);
    } catch (error) {
      next(error);
    }
  }

  async getreview(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await reviewService.getList(req);
      responseHandler(res, 'fetching review', data);
    } catch (error) {
      next(error);
    }
  }
}

export default new reviewController();
