/** @format */

import { Router } from 'express';
import reviewContoroller from '../controllers/review.controler';

export const reviewRouter = () => {
  const router = Router();

  router.get('/', reviewContoroller.getreview);
  router.post('/', reviewContoroller.createreview);

  return router;
};
