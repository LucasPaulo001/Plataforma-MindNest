import express from 'express';
const router = express.Router();

import userRoute from './userRoutes.mjs';

router.use('/api/users', userRoute);

export default router;
