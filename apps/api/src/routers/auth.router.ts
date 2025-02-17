import { Router } from 'express';
import { registerValidation, verifyRefreshToken, verifyUser } from '../middalewares/auth.middleware';
import { registerSchema } from '../models/user.model';
import authController from '../controllers/auth.controller';

export const authRouter = () => {
  const router = Router();

  router.post('/new', registerValidation(registerSchema), authController.signUp,
  );
  router.post('/', authController.signIn);

  router.post("/token", verifyRefreshToken, authController.refreshToken);
  router.patch('/:id', verifyUser, authController.updateUser);

  return router;
};
