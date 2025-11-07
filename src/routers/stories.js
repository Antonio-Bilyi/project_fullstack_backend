import { Router } from 'express';
import isValidId from '../middlewares/isValidId.js';
import validateBody from '../middlewares/validateBody.js';
import { updateStorySchema } from '../validation/updateStories.js';
import ctrlWrapper from '../utils/ctrlWrapper.js';
import { patchStoriesController } from '../controllers/stories/updateStoryCntrl.js';
import { upload } from '../middlewares/upload.js';

const router = Router();

router.patch(
  '/:storyId',
  isValidId,
  upload.single('photo'),
  validateBody(updateStorySchema),
  ctrlWrapper(patchStoriesController),
);

export default router;
