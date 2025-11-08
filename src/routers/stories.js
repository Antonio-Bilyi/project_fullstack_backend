import { Router } from 'express';
import ctrlWrapper from '../utils/ctrlWrapper.js';
import { getAllStoriesCntrl } from '../controllers/stories/getAllStoriesCntrl.js';
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

export default router;
