import { NextFunction, Request, Response } from 'express';
import panelFaqService from '../../services/panel/faq.service';
import {
  ErrorHandler,
  responseHandler,
  responsHandlerPagination,
} from '@/helpers/response.handler';
class PanelFaqController {
  async getFaq(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await panelFaqService.getList(req);
      const total_data = await panelFaqService.countTotal(req);
      responsHandlerPagination(res, 'success get faq data', data, total_data);
    } catch (error) {
      next(error);
    }
  }

  async getFaqById(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await panelFaqService.getById(req);
      if (!data) throw new ErrorHandler('faq not found', 404);
      responseHandler(res, 'success fetching faq with id', data);
    } catch (error) {
      next(error);
    }
  }
  async createfaq(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await panelFaqService.create(req);
      responseHandler(res, 'new faq has been created', data, 201);
    } catch (error) {
      next(error);
    }
  }
  async updatefaq(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await panelFaqService.update(req);
      responseHandler(res, ' faq has been updated', data, 201);
    } catch (error) {
      next(error);
    }
  }
  async deleteFaq(req: Request, res: Response, next: NextFunction) {
    try {
      await panelFaqService.delete(req);
      responseHandler(res, 'faq has been deleted');
    } catch (error) {
      next(error);
    }
  }
}

export default new PanelFaqController()
