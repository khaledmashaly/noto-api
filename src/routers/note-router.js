import { Router } from 'express';
import noteController from '../controllers/noteController';

const noteRouter = new Router();

noteRouter.route('/')
	.get(noteController.getAll)
	.post(noteController.create);

noteRouter.route('/:id')
	.get(noteController.get)
	.delete(noteController.delete)
	.put(noteController.update);

export default noteRouter;
