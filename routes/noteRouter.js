import { Router } from 'express';
import assert from 'assert';
import auth from '../config/jwt';
import mongoose from 'mongoose';

const Note = mongoose.model('Note');
const noteRouter = new Router();

noteRouter.all('*', auth);

noteRouter.route('/')
	.get(async (req, res, next) => {
		try {
			const ownerId = req.payload.id;
			const notes = await Note.find({ ownerId }).exec();
			res.status(200).json(notes);
		}
		catch (err) {
			next(err);
		}
	})
	.post(async (req, res, next) => {
		try {
			const ownerId = req.payload.id;
			const note = new Note({ ownerId });
			const newNote = await note.save();
			res.status(200).json({ id: newNote.id });
		}
		catch (err) {
			next(err);
		}
	});

noteRouter.route('/:id')
	.get(async (req, res, next) => {
		try {
			const noteId = req.params.id;
			const note = await Note.findById(noteId).exec();
			res.status(200).json(note);
		}
		catch (err) {
			next(err);
		}
	})
	.delete(async (req, res, next) => {
		try {
			const noteId = req.params.id;
			await Note.findByIdAndDelete(noteId).exec();
			res.status(204).end();
		}
		catch (err) {
			next(err);
		}
	})
	.put(async (req, res, next) => {
		try {
			const noteId = req.params.id;
			const newNote = req.body;
			const note = await Note.findByIdAndUpdate(noteId, newNote, { new: true }).exec();
			assert.strictEqual(note.title, newNote.title);
			res.status(204).end();
		}
		catch (err) {
			next(err);
		}
	});

export default noteRouter;
