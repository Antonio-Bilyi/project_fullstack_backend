import { Router } from 'express';
import { getCurrentUserCntrl } from '../controllers/users/getCurrentUserCntrl.js';
import ctrlWrapper from '../utils/ctrlWrapper.js';
import { UpdateUserAvatarCntrl } from '../controllers/users/updateUserAvatarCntrl.js';
import { authenticate } from '../middlewares/auth.js';
import { upload } from '../middlewares/upload.js';
import validateAvatar from '../middlewares/validateAvatar.js';
import { UpdateUserAvatarSchema } from '../validation/UpdateUserAvatarShema.js';

const usersRouter = Router();

// TODO: Add authenticate middleware when ready
// import { authenticate } from '../middlewares/authenticate.js';
// usersRouter.use(authenticate);

// GET /api/users/current - retrieve current authenticated user information
usersRouter.get('/current', ctrlWrapper(getCurrentUserCntrl));

usersRouter.patch(
  '/avatar',
  authenticate,
  upload.single('avatar'),
  validateAvatar(UpdateUserAvatarSchema),
  ctrlWrapper(UpdateUserAvatarCntrl),
);

export default usersRouter;
