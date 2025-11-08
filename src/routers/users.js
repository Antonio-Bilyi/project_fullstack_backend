import { Router } from 'express';
import { getCurrentUserCntrl } from '../controllers/users/getCurrentUserCntrl.js';
import { updateUserProfileCntrl } from '../controllers/users/updateUserProfileCntrl.js';
import ctrlWrapper from '../utils/ctrlWrapper.js';
import { authenticate } from '../middlewares/auth.js';
import validateBody from '../middlewares/validateBody.js';
import { updateUserProfileSchema } from '../validation/users.js';

const usersRouter = Router();

usersRouter.use(authenticate);

// GET /api/users/current - retrieve current authenticated user information
usersRouter.get('/current', ctrlWrapper(getCurrentUserCntrl));

// PATCH /api/users/profile - update current authenticated user profile
usersRouter.patch(
  '/profile',
  validateBody(updateUserProfileSchema),
  ctrlWrapper(updateUserProfileCntrl),
);

export default usersRouter;
