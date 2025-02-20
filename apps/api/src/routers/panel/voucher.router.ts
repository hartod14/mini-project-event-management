import { Router } from 'express';
import panelVoucherController from "../../controllers/panel/voucher.controller"

export const panelVoucherRouter = () => {
  const router = Router();

  router.get('/', panelVoucherController.getVoucher);
  router.post('/', panelVoucherController.createVoucher);
  router.get('/:id', panelVoucherController.getVoucherById);
  router.put('/:id', panelVoucherController.updateVoucher);
  router.delete('/:id', panelVoucherController.deleteVoucher);

  return router;
};
