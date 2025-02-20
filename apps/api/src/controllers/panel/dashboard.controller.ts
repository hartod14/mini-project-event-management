import { NextFunction, Request, Response } from 'express';
import panelVoucherService from "../../services/panel/voucher.service";

import {
  ErrorHandler,
  responseHandler,
  responsHandlerPagination,
} from '@/helpers/response.handler';
import dashboardService from '@/services/panel/dashboard.service';

class PanelDashboardController {
  async getData(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await dashboardService.getData(req);
      if (!data) throw new ErrorHandler("event not found", 404);
      responseHandler(res, "success fetching dashboard", data);
    } catch (error) {
      next(error);
    }
  }
}

export default new PanelDashboardController()
