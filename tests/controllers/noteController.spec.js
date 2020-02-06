import { describe, it } from 'mocha';
import sinon from 'sinon';

import { noteController } from '../../src/controllers/noteController';
import { NoteService } from '../../src/services/note-service';
import { AddNoteDTO } from '../../src/dtos/add-note-dto';
import { UpdateNoteDTO } from '../../src/dtos/update-note-dto';
import { NoteModel } from '../../src/models/note-model';

describe('noteController', () => {
	describe('#create', () => {
		it('should return 201 on success', async () => {
			const req = {
				user: { _id: '1' },
				body: {
					title: 'hello',
					body: 'world'
				}
			};
			const res = {
				status: sinon.stub().returnsThis(),
				json: sinon.spy()
			};
			const addNoteDTO = {
				title: req.body.title,
				body: req.body.body
			};
			const addedNote = {
				_id: '1',
				title: addNoteDTO.title,
				body: addNoteDTO.body,
				ownerId: req.user._id
			};

			const addNoteDtoFactoryStub = sinon.stub(AddNoteDTO, 'fromRequestBody').resolves(addNoteDTO);
			const noteServiceAddOneStub = sinon.stub(NoteService.prototype, 'addOne').resolves(addedNote);

			await noteController.create(req, res);

			sinon.assert.calledOnce(addNoteDtoFactoryStub);
			sinon.assert.calledWithExactly(addNoteDtoFactoryStub, req.body);
			sinon.assert.calledOnce(noteServiceAddOneStub);
			sinon.assert.calledWithExactly(noteServiceAddOneStub, req.user, addNoteDTO);
			sinon.assert.calledOnce(res.status);
			sinon.assert.calledWithExactly(res.status, 201);
			sinon.assert.calledOnce(res.json);
			sinon.assert.calledWithExactly(res.json, addedNote);
		});

		it('call next on failure', async () => {
			const req = {};
			const res = {};
			const next = sinon.spy();
			const thrownError = new Error('wrong data');

			const addNoteDtoFactoryStub = sinon.stub(AddNoteDTO, 'fromRequestBody').rejects(thrownError);

			await noteController.create(req, res, next);

			sinon.assert.calledOnce(addNoteDtoFactoryStub);
			sinon.assert.calledOnce(next);
			sinon.assert.calledWithExactly(next, thrownError);
		});
	});

	describe('#get', () => {
		it('should return 200 on success', async () => {
			const req = {
				user: { _id: '1' },
				params: { id: '1' }
			};
			const res = {
				status: sinon.stub().returnsThis(),
				json: sinon.spy()
			};
			const note = { _id: '1' };

			const noteServiceGetOne = sinon.stub(NoteService.prototype, 'getOne').resolves(note);

			await noteController.get(req, res);

			sinon.assert.calledOnce(noteServiceGetOne);
			sinon.assert.calledWithExactly(noteServiceGetOne, req.user, req.params.id);
			sinon.assert.calledOnce(res.status);
			sinon.assert.calledWithExactly(res.status, 200);
			sinon.assert.calledOnce(res.json);
			sinon.assert.calledWithExactly(res.json, note);
		});

		it('calls next on error', async () => {
			/*
				use an empty params object so that an error is note thrown
				when noteService.getOne references req.params.id
			*/
			const req = { params: {} };
			const res = {};
			const next = sinon.spy();
			const thrownError = new Error();

			const noteServiceGetOne = sinon.stub(NoteService.prototype, 'getOne').rejects(thrownError);

			await noteController.get(req, res, next);

			sinon.assert.calledOnce(noteServiceGetOne);
			sinon.assert.calledOnce(next);
			sinon.assert.calledWithExactly(next, thrownError);
		});
	});

	describe('#getAll', () => {
		it('should return 200 on success', async () => {
			const req = {
				user: { id: '1' }
			};
			const res = {
				status: sinon.stub().returnsThis(),
				json: sinon.spy()
			};

			const noteServiceGetMany = sinon.stub(NoteService.prototype, 'getMany').resolves([]);

			await noteController.getAll(req, res);

			sinon.assert.calledOnce(noteServiceGetMany);
			sinon.assert.calledWithExactly(noteServiceGetMany, req.user);
			sinon.assert.calledOnce(res.status);
			sinon.assert.calledWithExactly(res.status, 200);
			sinon.assert.calledOnce(res.json);
			sinon.assert.calledWithExactly(res.json, []);
		});

		it('should call next on error', async () => {
			const req = {};
			const res = {};
			const next = sinon.spy();
			const thrownError = new Error();

			const noteServiceGetMany = sinon.stub(NoteService.prototype, 'getMany').rejects(thrownError);

			await noteController.getAll(req, res, next);

			sinon.assert.calledOnce(noteServiceGetMany);
			sinon.assert.calledOnce(next);
			sinon.assert.calledWith(next, thrownError);
		});
	});

	describe('#update', () => {
		it('should return 204 on success', async () => {
			const req = {
				user: { _id: '1' },
				params: { id: '1' },
				body: { title: 'hello' }
			};
			const res = {
				status: sinon.stub().returnsThis(),
				end: sinon.spy()
			};
			const updateNoteDTO = { title: 'hello' };
			const updatedNote = {
				title: 'hello',
				body: ''
			};


			const updateNoteDtoFactoryStub = sinon.stub(UpdateNoteDTO, 'fromRequestBody').resolves(updateNoteDTO);
			const noteServiceUpdateOneStub = sinon.stub(NoteService.prototype, 'updateOne').resolves(updatedNote);

			await noteController.update(req, res);

			sinon.assert.calledOnce(updateNoteDtoFactoryStub);
			sinon.assert.calledWithExactly(updateNoteDtoFactoryStub, req.body);
			sinon.assert.calledOnce(noteServiceUpdateOneStub);
			sinon.assert.calledWithExactly(noteServiceUpdateOneStub, req.user, updateNoteDTO, req.params.id);
			sinon.assert.calledOnce(res.status);
			sinon.assert.calledWithExactly(res.status, 204);
			sinon.assert.calledOnce(res.end);
		});

		it('should call next on error', async () => {
			/*
				use an empty params object so that an error is note thrown
				when noteService.getOne references req.params.id
			*/
			const req = { params: {} };
			const res = {};
			const next = sinon.spy();
			const thrownError = new Error();

			const updateNoteDtoFactoryStub = sinon.stub(UpdateNoteDTO, 'fromRequestBody').rejects(thrownError);
			const noteServiceUpdateOneStub = sinon.stub(NoteService.prototype, 'updateOne');

			await noteController.update(req, res, next);

			sinon.assert.calledOnce(updateNoteDtoFactoryStub);
			sinon.assert.notCalled(noteServiceUpdateOneStub);
			sinon.assert.calledOnce(next);
			sinon.assert.calledWithExactly(next, thrownError);
		});
	});

	describe('#delete', () => {
		it('should return 204 on success', async () => {
			const req = {
				params: { id: '1' }
			};
			const res = {
				status: sinon.stub().returnsThis(),
				end: sinon.spy()
			};
			const next = sinon.spy();

			const findByIdAndDelete = sinon.stub(NoteModel, 'findByIdAndDelete').returns({
				exec: sinon.stub().resolves({})
			});

			await noteController.delete(req, res, next);

			sinon.assert.calledOnce(findByIdAndDelete);
			sinon.assert.calledWithExactly(findByIdAndDelete, '1');
			sinon.assert.calledOnce(res.status);
			sinon.assert.calledWith(res.status, 204);
			sinon.assert.calledOnce(res.end);

			return;
		});

		it('should call next on error', async () => {
			const req = {
				params: { id: '1' }
			};
			const res = {
				status: sinon.stub().returnsThis(),
				end: sinon.spy()
			};
			const next = sinon.spy();

			sinon.stub(NoteModel, 'findByIdAndDelete').returns({
				exec: sinon.stub().rejects({ error: 'error' })
			});

			await noteController.delete(req, res, next);

			sinon.assert.notCalled(res.status);
			sinon.assert.calledOnce(next);
			sinon.assert.calledWithExactly(next, { error: 'error' });

			return;
		});
	});
});
