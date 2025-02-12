/** @format */

import uploadImageController from '@/controllers/uploadImage.controller';
import { uploader } from '@/helpers/multer';
import { Router } from 'express';

export const uploadImageRouter = () => {
  const router = Router();

  router.post('/', uploader().single("image"), uploadImageController.uploadImage);
  // router.post('/', eventController.createevent);
  // router.delete('/:id', eventController.deleteevent);
  // router.patch('/:id', eventController.updateevent);

  return router;
};
