import mongoose from 'mongoose';

const Note = mongoose.model('Note');

const noteController = {
	async getAll(req, res, next) {
		try {
			const ownerId = req.user.id;
			const notes = await Note.find({ ownerId }).exec();
			res.status(200).json(notes);
		}
		catch (err) {
			next(err);
		}
	},

	async create(req, res, next) {
		try {
			const ownerId = req.user.id;
			const note = new Note({
				title: req.body.title,
				body: req.body.body,
				ownerId
			});
			const newNote = await note.save();
			res.status(201).json({ id: newNote.id });
		}
		catch (err) {
			next(err);
		}
	},

	async get(req, res, next) {
		try {
			const noteId = req.params.id;
			const note = await Note.findById(noteId).exec();
			res.status(200).json(note);
		}
		catch (err) {
			next(err);
		}
	},

	async delete(req, res, next) {
		try {
			const noteId = req.params.id;
			await Note.findByIdAndDelete(noteId).exec();
			res.status(204).end();
		}
		catch (err) {
			next(err);
		}
	},

	async update(req, res, next) {
		try {
			const noteId = req.params.id;
			const newNote = req.body;
			await Note.findByIdAndUpdate(noteId, newNote, { new: true }).exec();
			res.status(204).end();
		}
		catch (err) {
			next(err);
		}
	}
};

export default noteController;
