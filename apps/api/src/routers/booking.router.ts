/** @format */

import { Router } from 'express';
import bookingController from '../controllers/booking.controller';

export const bookingRouter = () => {
  const router = Router();
  router.post('/', bookingController.create);
  return router;
};
