import { Router } from 'express';
import noteValidator from '../../middleware/validators/noteValidator';

const noteRouteValidator = new Router();

noteRouteValidator.route('/')
	.post(noteValidator.create);

export default noteRouteValidator;
