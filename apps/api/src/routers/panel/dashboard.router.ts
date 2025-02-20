import { Router } from 'express';
import panelDashboardController from "../../controllers/panel/dashboard.controller"

export const panelDashboardRouter = () => {
  const router = Router();

  router.get('/', panelDashboardController.getData);

  return router;
};
