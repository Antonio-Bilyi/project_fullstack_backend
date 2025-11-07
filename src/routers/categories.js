import { Router } from 'express';
import ctrlWrapper from '../utils/ctrlWrapper.js';
import { getCategoriesCntrl } from '../controllers/categories/getCategoriesCntrl.js';

const router = Router();

router.get('/', ctrlWrapper(getCategoriesCntrl));

export default router;
