import { Router } from 'express';
import pannelCompanyInformationController from '@/controllers/panel/company-information.controller';
export const panelCompanyInformationRouter = () => {
  const router = Router();

  router.get(
    '/:id',
    pannelCompanyInformationController.getCompanyInformationById,
  );
  router.put(
    '/:id',
    pannelCompanyInformationController.updateCompanyInformation,
  );

  return router;
};
