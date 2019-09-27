import NotFoundError from '../errors/NotFoundError';
import Note from '../models/noteModel';

const noteController = {
	async create(req, res, next) {
		try {
			const ownerId = req.user.id;
			const newNote = await Note.create({
				title: req.body.title,
				body: req.body.body,
				ownerId
			});
			res.status(201);
			res.set('Location', '/note/' + newNote.id);
			res.end();
		}
		catch (err) {
			return next(err);
		}
	},

	async get(req, res, next) {
		try {
			const noteId = req.params.id;
			const note = await Note.findById(noteId).exec();
			return res.status(200).json(note);
		}
		catch (err) {
			return next(err);
		}
	},

	async getAll(req, res, next) {
		try {
			const ownerId = req.user.id;
			const notes = await Note.find({ ownerId }).exec();
			return res.status(200).json(notes);
		}
		catch (err) {
			return next(err);
		}
	},

	async update(req, res, next) {
		try {
			const noteId = req.params.id;
			const newNote = req.body;
			const updatedNote = await Note.findByIdAndUpdate(
				noteId,
				newNote,
				{ omitUndefined: true }
			).exec();
			if (!updatedNote) throw new NotFoundError('note not found');
			return res.status(204).end();
		}
		catch (err) {
			return next(err);
		}
	},

	async delete(req, res, next) {
		try {
			const noteId = req.params.id;
			await Note.findByIdAndDelete(noteId).exec();
			return res.status(204).end();
		}
		catch (err) {
			return next(err);
		}
	}
};

export default noteController;
