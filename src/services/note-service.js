import { Note } from '../models/noteModel';

export default class NoteService {
	constructor() {
		this.noteModel = Note;
	}

	saveOne(addNoteDTO, ownerId) {
		return this.noteModel.create({
			...addNoteDTO,
			ownerId
		});
	}

	getOne(noteId) {
		return this.noteModel.findOne({ _id: noteId }).exec();
	}

	getMany(userId) {
		return this.noteModel.find({ ownerId: userId }).exec();
	}

	async updateOne(updatedNoteDTO, noteId) {
		const oldNote = await this.getOne(noteId);

		for (const key of Object.keys(updatedNoteDTO)) {
			if (updatedNoteDTO[key] !== null) {
				oldNote[key] = updatedNoteDTO[key];
			}
		}

		if (oldNote.isModified()) {
			await oldNote.save();
		}

		return true;
	}

	deleteOne(noteId) {
		return this.noteModel.deleteOne({ _id: noteId }).exec();
	}
}
