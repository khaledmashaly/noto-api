import { Router } from 'express';
import userValidator from '../../middleware/validators/userValidator';

const userRouteValidator = new Router();

userRouteValidator.route('/')
	.post(userValidator.create);

export default userRouteValidator;
