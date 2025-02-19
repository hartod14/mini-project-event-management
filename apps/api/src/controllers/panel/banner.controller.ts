import { NextFunction, Request, Response } from 'express';
import panelBannerService from '../../services/panel/banner.service';
import {
  ErrorHandler,
  responseHandler,
  responsHandlerPagination,
} from '@/helpers/response.handler';
class PanelBannerController {
  async getBanner(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await panelBannerService.getList(req);
      const total_data = await panelBannerService.countTotal(req);
      responsHandlerPagination(res, 'success get Banner data', data, total_data);
    } catch (error) {
      next(error);
    }
  }

  async getBannerById(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await panelBannerService.getById(req);
      if (!data) throw new ErrorHandler('Banner not found', 404);
      responseHandler(res, 'success fetching Banner with id', data);
    } catch (error) {
      next(error);
    }
  }
  async createBanner(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await panelBannerService.create(req);
      responseHandler(res, 'new Banner has been created', data, 201);
    } catch (error) {
      next(error);
    }
  }
  async updateBanner(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await panelBannerService.update(req);
      responseHandler(res, ' Banner has been updated', data, 201);
    } catch (error) {
      next(error);
    }
  }
  async deleteBanner(req: Request, res: Response, next: NextFunction) {
    try {
      await panelBannerService.delete(req);
      responseHandler(res, 'Banner has been deleted');
    } catch (error) {
      next(error);
    }
  }
}

export default new PanelBannerController()
