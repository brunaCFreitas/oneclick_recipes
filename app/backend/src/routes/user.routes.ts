import { Router } from 'express';
import regiterVerify from '../middlewares/userRegiter.middleware';
import userLoginVerify from '../middlewares/login.middleware';
import UserController from '../controllers/User.controller';

const userRouter = Router();

const { login, register } = UserController;

userRouter
  .post('/login', userLoginVerify, login)
  .post('/register', regiterVerify, register);

export default userRouter;
