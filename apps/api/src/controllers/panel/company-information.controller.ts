import { NextFunction, Request, Response } from 'express';
import panelCompanyInformationServie from '../../services/panel/company-information.service';
import { ErrorHandler, responseHandler } from '@/helpers/response.handler';

class PanelCompanyInformationController {
  async getCompanyInformationById(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await panelCompanyInformationServie.getById(req);
      if (!data) throw new ErrorHandler('Company Information not found', 404);
      responseHandler(res, 'success fetching faq with id', data);
    } catch (error) {
      next(error);
    }
  }
   async updateCompanyInformation(req: Request, res: Response, next: NextFunction) {
      try {
        const data = await panelCompanyInformationServie.update(req);
        responseHandler(res, ' Company Information has been updated', data, 201);
      } catch (error) {
        next(error);
      }
    }
}

export default new PanelCompanyInformationController()
