import { Router } from 'express';
import authController from '../../controllers/authController';

const authRouter = new Router();

authRouter.route('/')
	.post(authController.login);

export default authRouter;
