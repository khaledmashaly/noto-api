import { describe, it } from 'mocha';
import { expect } from 'chai';
import sinon from 'sinon';

import { noteController } from '../../src/controllers/noteController';
import { NoteService } from '../../src/services/note-service';
import { AddNoteDTO } from '../../src/dtos/add-note-dto';
import { NoteModel } from '../../src/models/note-model';
import NotFoundError from '../../src/errors/NotFoundError';

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
			const next = sinon.spy();

			const find = sinon.stub(NoteModel, 'find');
			find.returns({ exec: sinon.stub().resolves([]) });

			await noteController.getAll(req, res, next);

			sinon.assert.calledOnce(res.status);
			sinon.assert.calledWith(res.status, 200);
			sinon.assert.calledOnce(res.json);
			sinon.assert.calledWith(res.json, []);

			return;
		});

		it('should call next on error', async () => {
			const req = {
				user: { id: '1' }
			};
			const res = {
				status: sinon.stub().returnsThis(),
				json: sinon.spy()
			};
			const next = sinon.spy();

			const find = sinon.stub(NoteModel, 'find');
			find.returns({ exec: sinon.stub().rejects({ error: 'error' }) });

			await noteController.getAll(req, res, next);

			sinon.assert.calledOnce(next);
			sinon.assert.calledWith(next, { error: 'error' });

			return;
		});
	});

	describe('#update', () => {
		it('should return 204 on success', async () => {
			const req = {
				params: { id: '1' },
				body: { title: 'hello' }
			};
			const res = {
				status: sinon.stub().returnsThis(),
				end: sinon.spy()
			};
			const next = sinon.spy();

			const findByIdAndUpdate = sinon.stub(NoteModel, 'findByIdAndUpdate');
			findByIdAndUpdate.returns({
				exec: sinon.stub().resolves({
					id: '1',
					title: 'hello'
				})
			});

			await noteController.update(req, res, next);

			sinon.assert.calledOnce(findByIdAndUpdate);
			sinon.assert.calledWith(findByIdAndUpdate, '1', { title: 'hello' }, { omitUndefined: true });
			sinon.assert.calledOnce(res.status);
			sinon.assert.calledWith(res.status, 204);
			sinon.assert.calledOnce(res.end);

			return;
		});

		it('should call next on error', async () => {
			const req = {
				params: { id: '1' },
				body: { title: 'hello' }
			};
			const res = {
				status: sinon.stub().returnsThis(),
				end: sinon.spy()
			};
			const next = sinon.spy();

			const findByIdAndUpdate = sinon.stub(NoteModel, 'findByIdAndUpdate');
			findByIdAndUpdate.returns({
				exec: sinon.stub().resolves(undefined)
			});

			await noteController.update(req, res, next);

			sinon.assert.calledOnce(next);
			expect(next.firstCall.args[0] instanceof NotFoundError, 'argument is not a NotFoundError').to.be.true;

			return;
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
