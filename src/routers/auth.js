import { Router } from 'express';
import ctrlWrapper  from '../utils/ctrlWrapper.js';
import { loginSchema} from '../validation/auth.js';
import { loginUserController } from '../controllers/auth/loginUserCntrl.js';
import validateBody from '../middlewares/validateBody.js';

const router = Router();

router.post(
  '/login',
  validateBody(loginSchema),
  ctrlWrapper(loginUserController),
);

export default router;
