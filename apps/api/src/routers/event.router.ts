/** @format */

import { Router } from 'express';
import eventController from '../controllers/event.controller';

export const eventRouter = () => {
  const router = Router();

  router.get('/', eventController.getevents);
  router.get('/:slug', eventController.geteventBySlug);
  router.post('/', eventController.createevent);
  router.delete('/:id', eventController.deleteevent);
  router.patch('/:id', eventController.updateevent);
  return router;
};
