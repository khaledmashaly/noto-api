import NoteService from '../services/note-service';
import AddNoteDTO from '../dtos/add-note-dto';
import UpdateNoteDTO from '../dtos/update-note-dto';

const noteService = new NoteService();

const noteController = {
	async create(req, res, next) {
		try {
			const addNoteDTO = await AddNoteDTO.fromRequestBody(req.body);

			const newNote = await noteService.saveOne(addNoteDTO, req.user.id);

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
			const note = await noteService.getOne(req.params.id);

			return res.status(200).json(note);
		}
		catch (err) {
			return next(err);
		}
	},

	async getAll(req, res, next) {
		try {
			const notes = await noteService.getMany(req.user.id);

			return res.status(200).json(notes);
		}
		catch (err) {
			return next(err);
		}
	},

	async update(req, res, next) {
		try {
			const updatedNoteDTO = await UpdateNoteDTO.fromRequestBody(req.body);

			await noteService.updateOne(updatedNoteDTO, req.params.id);

			return res.status(204).end();
		}
		catch (err) {
			return next(err);
		}
	},

	async delete(req, res, next) {
		try {
			await noteService.deleteOne(req.params.id);

			return res.status(204).end();
		}
		catch (err) {
			return next(err);
		}
	}
};

export default noteController;
