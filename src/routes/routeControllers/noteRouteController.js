import { Router } from 'express';
import noteController from '../../controllers/noteController';

const noteRouteController = new Router();

noteRouteController.route('/')
	.get(noteController.getAll)
	.post(noteController.create);

noteRouteController.route('/:id')
	.get(noteController.get)
	.delete(noteController.delete)
	.put(noteController.update);

export default noteRouteController;
