import { Router } from 'express';
import assert from 'assert';
import { Note } from '../config/db';

const noteRouter = new Router();

noteRouter.route('/')
	.get((req, res) => {
		Note.find()
			.then(docs => {
				res.status(200).json(docs);
			})
			.catch(err => {
				console.error(err);
				res.status(500).send(err);
			});
	})
	.post((req, res) => {
		console.log('req.body:', req.body);
		Note.create(new Note)
			.then(doc => {
				res.status(200).send(doc.id);
			})
			.catch(err => {
				console.error(err);
				res.status(500).send(err);
			});
	});

noteRouter.route('/:id')
	.get((req, res) => {
		Note.findById(req.params.id)
			.then(doc => {
				res.status(200).json(doc);
			})
			.catch(err => {
				console.error(err);
				res.status(500).send(err);
			});
	})
	.delete((req, res) => {
		Note.findByIdAndDelete(req.params.id)
			.then(() => {
				res.status(204).send();
			})
			.catch(err => {
				console.error(err);
				res.status(500).send(err);
			});
	})
	.put((req, res) => {
		Note.findByIdAndUpdate(req.params.id, req.body, { new: true })
		.then(doc => {
			assert.strictEqual(doc.title, req.body.title);
			res.status(204).send();
		})
			.catch(err => {
				console.error(err);
				res.status(500).send(err);
			});
	});

export default noteRouter;
