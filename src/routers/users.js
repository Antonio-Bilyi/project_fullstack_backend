import { Router } from 'express';
import { getCurrentUserCntrl } from '../controllers/users/getCurrentUserCntrl.js';
import ctrlWrapper from '../utils/ctrlWrapper.js';
import { getAllUsersCntrl } from '../controllers/users/getAllUsersCntrl.js';
import { authenticate } from '../middlewares/auth.js';

const usersRouter = Router();

usersRouter.get('/current',authenticate,  ctrlWrapper(getCurrentUserCntrl));

/**
 * Group public users routes
 */
usersRouter.get('/', ctrlWrapper(getAllUsersCntrl));

export default usersRouter;

