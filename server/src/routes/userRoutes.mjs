import express from 'express';
const userRoute = express.Router();

import { validation } from '../middlewares/handleValidations.mjs';
import { authGuard } from '../middlewares/authGuard.mjs';
import {
  registerValidations,
  loginValidations,
} from '../middlewares/userValidations.mjs';

import {
  register,
  login,
  getCurrentUser,
  createPage,
  listPage,
} from '../controllers/UserController.mjs';

userRoute.post('/register', registerValidations(), validation, register);
userRoute.post('/login', loginValidations(), validation, login);
userRoute.get('/profile', authGuard, getCurrentUser);
userRoute.post('/create-page', authGuard, createPage);
userRoute.get('/list-pages', authGuard, listPage);

export default userRoute;
