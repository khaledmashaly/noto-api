import { NoteModel } from '../models/note-model';
import AccessController from '../lib/access-control/access-controller';
import AuthorizationError from '../errors/AuthorizationError';
import NotFoundError from '../errors/NotFoundError';

export default class NoteService {
	constructor() {
		this.NoteModel = NoteModel;
		this.accessController = new AccessController();
	}

	/**
	 * add a new note
	 * @param {object} user authenticated user
	 * @param {AddNoteDTO} addNoteDTO new note data
	 * @return {Promise} resolves to the added document
	 */
	addOne(user, addNoteDTO) {
		return this.NoteModel.create({
			...addNoteDTO,
			ownerId: user._id
		});
	}

	/**
	 * get the requested note
	 * @param {object} user authenticated user
	 * @param {string} noteId requested note id
	 * @return {object} requested note document
	 * @throws {AuthorizationError} if user doesn't have access to requested note
	 */
	async getOne(user, noteId) {
		const note = await this.NoteModel.findOne({ _id: noteId }).exec();

		if (note === null) {
			throw new NotFoundError('note is not found');
		}

		const permission = this.accessController.canRead(user, note);

		if (!permission) {
			throw new AuthorizationError('user doesn\'t have access to requested note');
		}

		return note;
	}

	/**
	 * get all notes added by authenticated user
	 * @param {object} user authenticated user
	 * @return {object[]} array of note documents added by authenticated user
	 */
	getMany(user) {
		return this.NoteModel.find({ ownerId: user._id }).exec();
	}

	/**
	 * edit requested note
	 * @param {object} user authenticated user
	 * @param {UpdatedNoteDTO} updatedNoteDTO updated note data
	 * @param {string} noteId id of note to be updated
	 */
	async updateOne(user, updatedNoteDTO, noteId) {
		const oldNote = await this.getOne(user, noteId);

		const permission = this.accessController.canEdit(user, oldNote);

		if (!permission) {
			throw new AuthorizationError('user doesn\'t have permission to edit note');
		}

		for (const key of Object.keys(updatedNoteDTO)) {
			if (updatedNoteDTO[key] !== null) {
				oldNote[key] = updatedNoteDTO[key];
			}
		}

		if (oldNote.isModified()) {
			await oldNote.save();
		}
	}

	async deleteOne(user, noteId) {
		const noteToDelete = await this.getOne(user, noteId);

		const permission = this.accessController.canDelete(user, noteToDelete);

		if (!permission) {
			throw new AuthorizationError('user doesn\'t have permission to edit note');
		}

		return this.NoteModel.deleteOne({ _id: noteId }).exec();
	}
}
