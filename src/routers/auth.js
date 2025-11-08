import { Router } from 'express';
import ctrlWrapper  from '../utils/ctrlWrapper.js';
import { loginSchema} from '../validation/auth.js';
import { loginUserController } from '../controllers/auth/loginUserCntrl.js';
import validateBody from '../middlewares/validateBody.js';
import { registerUserSchema } from '../validation/auth.js';
import { registerUserController } from '../controllers/auth/registerUserCntrl.js';
import { logoutUserController } from '../controllers/auth/logoutUserCntrl.js';
import { refreshUserSessionController } from '../controllers/auth/refreshSessionCntrl.js';

const router = Router();
router.post(
  '/register',
  validateBody(registerUserSchema),
  ctrlWrapper(registerUserController),
);

router.post(
  '/login',
  validateBody(loginSchema),
  ctrlWrapper(loginUserController),
);

router.post(
  '/logout',
  ctrlWrapper(logoutUserController));

router.post(
  '/refresh',
    ctrlWrapper(refreshUserSessionController));

export default router;
