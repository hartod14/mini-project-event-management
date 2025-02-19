import { Router } from 'express';
import panelBannerController from '@/controllers/panel/banner.controller';
export const panelBannerRouter = () => {
  const router = Router();

  router.get('/', panelBannerController.getBanner);
  router.post('/', panelBannerController.createBanner);
  router.get('/:id', panelBannerController.getBannerById);
  router.put('/:id', panelBannerController.updateBanner);
  router.delete('/:id', panelBannerController.deleteBanner);

  return router;
};
