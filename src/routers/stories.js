import { Router } from 'express';
import ctrlWrapper from '../utils/ctrlWrapper.js';
import { getAllStoriesCntrl } from '../controllers/stories/getAllStoriesCntrl.js';

const router = Router();

router.get('/', ctrlWrapper(getAllStoriesCntrl));

export default router;
