import { Router } from "express";
import authRouter from './auth.js';
import storiesRouter from './stories.js';
import usersRouter from './users.js';

const router = Router();

router.use('/auth', authRouter);
router.use('/stories', storiesRouter);

export default router;
