import { Router } from 'express';
import { getCurrentUserCntrl } from '../controllers/users/getCurrentUserCntrl.js';
import ctrlWrapper from '../utils/ctrlWrapper.js';

const usersRouter = Router();

// TODO: Add authenticate middleware when ready
// import { authenticate } from '../middlewares/authenticate.js';
// usersRouter.use(authenticate);

// GET /api/users/current - retrieve current authenticated user information
usersRouter.get('/current', ctrlWrapper(getCurrentUserCntrl));

export default usersRouter;
