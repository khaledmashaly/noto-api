import { Router } from 'express';
import userController from '../controllers/userController';

const userRouter = new Router();

userRouter.route('/')
	.post(userController.create);

userRouter.route('/profile')
	.get(userController.getProfile);

export default userRouter;
