import { NextFunction, Request, Response } from 'express';
import panelVoucherService from "../../services/panel/voucher.service";

import {
  ErrorHandler,
  responseHandler,
  responsHandlerPagination,
} from '@/helpers/response.handler';

class PanelBannerController {
  async getVoucher(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await panelVoucherService.getList(req);
      const total_data = await panelVoucherService.countTotal(req);
      responsHandlerPagination(
        res,
        'success get Voucher data',
        data,
        total_data,
      );
    } catch (error) {
      next(error);
    }
  }
  async getVoucherById(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await panelVoucherService.getById(req);
      if (!data) throw new ErrorHandler('Voucher not found', 404);
      responseHandler(res, 'success fetching Voucher with id', data);
    } catch (error) {
      next(error);
    }
  }

  async createVoucher(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await panelVoucherService.create(req);
      responseHandler(res, 'new Voucher has been created', data, 201);
    } catch (error) {
      next(error);
    }
  }

  async updateVoucher(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await panelVoucherService.update(req);
      responseHandler(res, ' Voucher has been updated', data, 201);
    } catch (error) {
      next(error);
    }
  }
  async deleteVoucher(req: Request, res: Response, next: NextFunction) {
    try {
      await panelVoucherService.delete(req);
      responseHandler(res, 'Voucher has been deleted');
    } catch (error) {
      next(error);
    }
  }
}

export default new PanelBannerController()
