import { Router } from 'express';
import { getCurrentUserCntrl } from '../controllers/users/getCurrentUserCntrl.js';
import ctrlWrapper from '../utils/ctrlWrapper.js';
import { getAllUsersCntrl } from '../controllers/users/getAllUsersCntrl.js';

const usersRouter = Router();

// TODO: Add authenticate middleware when ready
// import { authenticate } from '../middlewares/authenticate.js';
// usersRouter.use(authenticate);

// GET /api/users/current - retrieve current authenticated user information
usersRouter.get('/current', ctrlWrapper(getCurrentUserCntrl));

/**
 * Group public users routes
 */
usersRouter.get('/', ctrlWrapper(getAllUsersCntrl));

export default usersRouter;

