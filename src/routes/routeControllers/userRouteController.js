import { Router } from 'express';
import userController from '../../controllers/userController';

const userRouteController = new Router();

userRouteController.route('/')
	.post(userController.create);

userRouteController.route('/profile')
	.get(userController.getProfile);

export default userRouteController;
