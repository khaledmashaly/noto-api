import { Router } from 'express';
import noteValidator from '../../middleware/validators/noteValidator';

const noteRouteValidator = new Router();

noteRouteValidator.route('/')
	.post(noteValidator.create);

noteRouteValidator.route('/:id')
	.put(noteValidator.update);

export default noteRouteValidator;
