import { Router } from 'express';
import assert from 'assert';
import auth from '../config/jwt';
import mongoose from 'mongoose';

const Note = mongoose.model('Note');
const noteRouter = new Router();

noteRouter.all('*', auth);

noteRouter.route('/')
	.get(async (req, res) => {
		try {
			const ownerId = req.payload.id;
			const notes = await Note.find({ ownerId }).exec();
			res.status(200).json(notes);
		}
		catch (err) {
			console.error(err);
			res.status(500).send(err);
		}
	})
	.post((req, res) => {
		Note.create(new Note)
			.then(doc => {
				res.status(200).send(doc.id);
			})
			.catch(err => {
				console.error(err);
				res.sendStatus(500);
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
				res.sendStatus(500);
			});
	})
	.delete((req, res) => {
		Note.findByIdAndDelete(req.params.id)
			.then(() => {
				res.status(204).end();
			})
			.catch(err => {
				console.error(err);
				res.sendStatus(500);
			});
	})
	.put((req, res) => {
		Note.findByIdAndUpdate(req.params.id, req.body, { new: true })
		.then(doc => {
			assert.strictEqual(doc.title, req.body.title);
			res.status(204).end();
		})
			.catch(err => {
				console.error(err);
				res.sendStatus(500);
			});
	});

export default noteRouter;
