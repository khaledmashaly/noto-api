import { Router } from 'express';
import { ObjectID } from 'mongodb';
import assert from 'assert';
import { findAll, insertOne, findOne, deleteOne, updateOne } from '../db/db';

const noteRouter = new Router();

noteRouter.route('/')
	.get((req, res) => {
		findAll().then(docs => {
				res.status(200).json(docs);
		})
		.catch(err => console.error(err));
	})
	.post((req, res) => {
		insertOne(req.body).then(insertedId => {
			res.status(200).send(insertedId);
		})
		.catch(err => console.error(err));
	});

noteRouter.route('/:id')
	.get((req, res) => {
		const id = new ObjectID(req.params.id);
		findOne({ _id: id })
			.then(doc => {
				res.status(200).json(doc);
			})
			.catch(err => console.error(err));
	})
	.delete((req, res) => {
		const id = new ObjectID(req.params.id);
		deleteOne({ _id: id })
			.then(({ deletedCount }) => {
				assert.equal(deletedCount, 1);
				res.status(204).send();
			})
			.catch((err) => console.error(err));
	})
	.put((req, res) => {
		const id = new ObjectID(req.params.id);
		const { title: newTitle, body: newBody } = req.body;
		updateOne({ _id: id }, {
			$set: {
				title: newTitle,
				body: newBody
			}
		})
		.then(({ modifiedCount }) => {
			assert.equal(modifiedCount, 1);
			res.status(204).send();
		})
		.catch((err) => console.error(err));
	});

export default noteRouter;
