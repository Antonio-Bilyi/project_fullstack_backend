import { Router } from 'express';
import authRouter from './auth.js';
import storiesRouter from './stories.js';
import usersRouter from './users.js';
import categoriesRouter from './categories.js';

const router = Router();

router.use('/auth', authRouter);
router.use('/stories', storiesRouter);
router.use('/users', usersRouter);
router.use('/categories', categoriesRouter);

export default router;
