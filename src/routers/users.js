import { Router } from 'express';
import { getCurrentUserCntrl } from '../controllers/users/getCurrentUserCntrl.js';
import ctrlWrapper from '../utils/ctrlWrapper.js';
import { authenticate } from '../middlewares/auth.js';

const usersRouter = Router();

usersRouter.get('/current',authenticate,  ctrlWrapper(getCurrentUserCntrl));

export default usersRouter;
