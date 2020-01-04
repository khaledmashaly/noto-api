import NoteService from '../services/note-service';

const noteService = new NoteService();

const noteController = {
	async create(req, res, next) {
		try {
			const createNoteDTO = {
				title: req.body.title,
				body: req.body.body
			};

			const newNote = await noteService.saveOne(createNoteDTO, req.user.id);

			return res
					.status(201)
					.set('Location', '/note/' + newNote.id)
					.json(newNote)
					.end();
		}
		catch (err) {
			return next(err);
		}
	},

	async get(req, res, next) {
		try {
			const noteId = req.params.id;
			const note = await noteService.getOne(noteId);
			return res.status(200).json(note);
		}
		catch (err) {
			return next(err);
		}
	},

	async getAll(req, res, next) {
		try {
			const ownerId = req.user.id;
			const notes = await noteService.getMany(ownerId);
			return res.status(200).json(notes);
		}
		catch (err) {
			return next(err);
		}
	},

	async update(req, res, next) {
		try {
			const noteId = req.params.id;
			const updatedNote = req.body;
			await noteService.updateOne(updatedNote, noteId);
			return res.status(204).end();
		}
		catch (err) {
			return next(err);
		}
	},

	async delete(req, res, next) {
		try {
			const noteId = req.params.id;
			await noteService.deleteOne(noteId);
			return res.status(204).end();
		}
		catch (err) {
			return next(err);
		}
	}
};

export default noteController;
