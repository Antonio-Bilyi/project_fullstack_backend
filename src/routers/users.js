import { Router } from 'express';
import { getCurrentUserCntrl } from '../controllers/users/getCurrentUserCntrl.js';
import { updateUserProfileCntrl } from '../controllers/users/updateUserProfileCntrl.js';
import ctrlWrapper from '../utils/ctrlWrapper.js';
import { UpdateUserAvatarCntrl } from '../controllers/users/updateUserAvatarCntrl.js';
import getUserByIdCntrl from '../controllers/users/getUserByIdCntrl.js';
import { upload } from '../middlewares/upload.js';
import validateAvatar from '../middlewares/validateAvatar.js';
import { UpdateUserAvatarSchema } from '../validation/UpdateUserAvatarShema.js';
import { getAllUsersCntrl } from '../controllers/users/getAllUsersCntrl.js';
import { authenticate } from '../middlewares/auth.js';
import validateBody from '../middlewares/validateBody.js';
import { updateUserProfileSchema } from '../validation/users.js';
import isValidUserId from '../middlewares/isValidUserId.js';
import { addStoryToDownloadCntrl } from '../controllers/users/addStoryToDownloadCntrl.js';
import { addDelStoryToDownloadsSchema } from '../validation/addDelStoryToDownloads.js';
import { removeStoryFromDownloadCntrl } from '../controllers/users/removeStoryFromDownloadCntrl.js';

const usersRouter = Router();

usersRouter.get('/', ctrlWrapper(getAllUsersCntrl));

usersRouter.get('/current', authenticate, ctrlWrapper(getCurrentUserCntrl));

usersRouter.get('/:userId', isValidUserId, ctrlWrapper(getUserByIdCntrl));

usersRouter.patch(
  '/avatar',
  authenticate,
  upload.single('avatar'),
  validateAvatar(UpdateUserAvatarSchema),
  ctrlWrapper(UpdateUserAvatarCntrl),
);

usersRouter.patch(
  '/profile',
  authenticate,
  validateBody(updateUserProfileSchema),
  ctrlWrapper(updateUserProfileCntrl),
);

usersRouter.post(
  '/addStoryToSave',
  authenticate,
  validateBody(addDelStoryToDownloadsSchema),
  ctrlWrapper(addStoryToDownloadCntrl),
);

usersRouter.delete(
  '/removeStoryFromSave',
  authenticate,
  validateBody(addDelStoryToDownloadsSchema),
  ctrlWrapper(removeStoryFromDownloadCntrl),
);

export default usersRouter;
