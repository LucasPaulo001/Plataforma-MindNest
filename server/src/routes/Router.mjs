import express from 'express';
const router = express.Router();

import userRoute from './userRoutes.mjs';
import pageRouter from './pageRoutes.mjs';

router.use('/api/users', userRoute);
router.use('/api/pages', pageRouter);

export default router;
