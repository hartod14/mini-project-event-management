import { Router } from 'express';
import { registerSchema } from '@/models/user.model';
import { registerValidation, verifyUser } from '@/middalewares/auth.middleware';
import authController from '@/controllers/auth.controller';

export const authRouter = () => {
  const router = Router();

  router.post(
    '/new',
    registerValidation(registerSchema),
    authController.signUp,
  );
  router.post('/', authController.signIn);
  router.patch('/:id', verifyUser, authController.updateUser);

  return router;
};
