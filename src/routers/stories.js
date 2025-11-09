import { Router } from 'express';
import ctrlWrapper from '../utils/ctrlWrapper.js';
import { getAllStoriesCntrl } from '../controllers/stories/getAllStoriesCntrl.js';
import isValidStoryId from '../middlewares/isValidStoryId.js';
import { updateStorySchema } from '../validation/updateStories.js';
import { patchStoriesController } from '../controllers/stories/updateStoryCntrl.js';
import { createStoryController } from '../controllers/stories/createStoryCntrl.js';
import { authenticate } from '../middlewares/auth.js';
import validateBody from '../middlewares/validateBody.js';
import { createStorySchema } from '../validation/story.js';
import { upload } from '../middlewares/upload.js';

const router = Router();

router.get('/', ctrlWrapper(getAllStoriesCntrl));

router.post(
  '/',
  authenticate,
  upload.single('img'),
  validateBody(createStorySchema),
  ctrlWrapper(createStoryController),
);

router.patch(
  '/:storyId',
  authenticate,
  isValidStoryId,
  upload.single('photo'),
  validateBody(updateStorySchema),
  ctrlWrapper(patchStoriesController),
);

export default router;
