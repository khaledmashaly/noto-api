import { Router } from 'express';
import userValidator from '../middleware/validators/userValidator';
import userController from '../controllers/userController';

const userRouter = new Router();

userRouter.route('/')
	.post(userValidator.create, userController.create);

userRouter.route('/profile')
	.get(userController.getProfile);

export default userRouter;
