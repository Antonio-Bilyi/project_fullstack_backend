import { Router } from 'express';
import authRouter from './auth.js';
import storiesRouter from './stories.js';
import usersRouter from './users.js';

const router = Router();

router.use('/users', usersRouter);

export default router;