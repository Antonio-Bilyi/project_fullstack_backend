import { Router } from 'express';
import { getCurrentUserCntrl } from '../controllers/users/getCurrentUserCntrl.js';
import ctrlWrapper from '../utils/ctrlWrapper.js';
import { authenticate } from '../middlewares/auth.js';
import { getUserByIdCntrl } from '../controllers/users/getUserByIdCntrl.js';

const usersRouter = Router();

usersRouter.get('/current', authenticate, ctrlWrapper(getCurrentUserCntrl));
usersRouter.get('/:id', ctrlWrapper(getUserByIdCntrl));

export default usersRouter;
