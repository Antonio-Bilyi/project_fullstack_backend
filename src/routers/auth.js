import { Router } from 'express';
import ctrlWrapper  from '../utils/ctrlWrapper.js';
import { registerUserSchema } from '../validation/auth.js';
import { registerUserController } from '../controllers/auth/registerUserCntrl.js';
import validateBody from '../middlewares/validateBody.js';
import { logoutUserController } from '../controllers/auth/logoutUserCntrl.js';

const router = Router();
router.post(
  '/register',
  validateBody(registerUserSchema),
  ctrlWrapper(registerUserController),
);

router.post(
  '/logout',
  ctrlWrapper(logoutUserController));
  
export default router;
