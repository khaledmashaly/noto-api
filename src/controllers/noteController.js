import { NoteService } from '../services/note-service';
import { AddNoteDTO } from '../dtos/add-note-dto';
import { UpdateNoteDTO } from '../dtos/update-note-dto';

const noteService = new NoteService();

export const noteController = {
	async create(req, res, next) {
		try {
			const addNoteDTO = await AddNoteDTO.fromRequestBody(req.body);

			const newNote = await noteService.addOne(req.user, addNoteDTO);

			return res.status(201).json(newNote);
		}
		catch (err) {
			return next(err);
		}
	},

	async get(req, res, next) {
		try {
			const note = await noteService.getOne(req.user, req.params.id);

			return res.status(200).json(note);
		}
		catch (err) {
			return next(err);
		}
	},

	async getAll(req, res, next) {
		try {
			const notes = await noteService.getMany(req.user);

			return res.status(200).json(notes);
		}
		catch (err) {
			return next(err);
		}
	},

	async update(req, res, next) {
		try {
			const updatedNoteDTO = await UpdateNoteDTO.fromRequestBody(req.body);

			await noteService.updateOne(req.user, updatedNoteDTO, req.params.id);

			return res.status(204).end();
		}
		catch (err) {
			return next(err);
		}
	},

	async delete(req, res, next) {
		try {
			await noteService.deleteOne(req.user, req.params.id);

			return res.status(204).end();
		}
		catch (err) {
			return next(err);
		}
	}
};
