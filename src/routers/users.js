import { Router } from 'express';
import { getCurrentUserCntrl } from '../controllers/users/getCurrentUserCntrl.js';
import { updateUserProfileCntrl } from '../controllers/users/updateUserProfileCntrl.js';
import ctrlWrapper from '../utils/ctrlWrapper.js';
import { getAllUsersCntrl } from '../controllers/users/getAllUsersCntrl.js';
import { authenticate } from '../middlewares/auth.js';
import validateBody from '../middlewares/validateBody.js';
import { updateUserProfileSchema } from '../validation/users.js';

const usersRouter = Router();

// застосовуємо authenticate до всіх ендпоінтів
usersRouter.use(authenticate);

// GET /api/users/current - отримати поточного користувача
usersRouter.get('/current', ctrlWrapper(getCurrentUserCntrl));

// PATCH /api/users/profile - оновити профіль поточного користувача
usersRouter.patch(
  '/profile',
  validateBody(updateUserProfileSchema),
  ctrlWrapper(updateUserProfileCntrl),
);

/**
 * Group public users routes
 */
usersRouter.get('/', ctrlWrapper(getAllUsersCntrl));

export default usersRouter;

