import { describe, it } from 'mocha';
import { expect } from 'chai';
import { Note, NOTE_STATE } from '../../src/models/noteModel';

describe('note', () => {
	describe('title', () => {
		it('should be invalid if title is empty', (done) => {
			const note = new Note({
				ownerId: '5d55847007e7fe30baac1767'
			});

			const validationError = note.validateSync();

			try {
				expect(validationError, 'validationError is undefined')
					.to.exist;
				expect(validationError.errors.title, 'errors.title doesn\'t exist')
					.to.exist;
				expect(validationError.errors.title.message)
					.to.equal('title is required', 'error message is wrong');
			}
			catch (e) {
				return done(e);
			}

			return done();
		});
	});

	describe('state', () => {
		it(`should be invalid if not one of: ${NOTE_STATE.join(', ')}`, (done) => {
			const note = new Note({
				state: 'NOTHING'
			});

			const validationError = note.validateSync();

			try {
				expect(validationError, 'validationError is undefined')
					.to.exist;
				expect(validationError.errors.state, 'errors.state doesn\'t exist')
					.to.exist;
				expect(validationError.errors.state.message)
					.to.equal('invalid value for note.state', 'error message is wrong');
			}
			catch (e) {
				return done(e);
			}

			return done();
		});
	});

	describe('ownerId', () => {
		it('should be invalid if ownerId is empty', (done) => {
			const note = new Note({
				title: 'hellooooo'
			});

			const validationError = note.validateSync();

			try {
				expect(validationError, 'validationError is undefined')
					.to.exist;
				expect(validationError.errors.ownerId, 'errors.ownerId doesn\'t exist')
					.to.exist;
				expect(validationError.errors.ownerId.message)
					.to.equal('ownerId is required', 'error message is wrong');
			}
			catch (e) {
				return done(e);
			}

			return done();
		});

		it('should be invalid if ownerId is not an ObjectId', (done) => {
			const note = new Note({
				title: 'hellooooo',
				ownerId: 'ret'
			});

			const validationError = note.validateSync();

			try {
				expect(validationError, 'validationError is undefined')
					.to.exist;
				expect(validationError.errors.ownerId, 'errors.ownerId doesn\'t exist')
					.to.exist;
				expect(validationError.errors.ownerId.message)
					.to.contain('Cast to ObjectID failed for value', 'wrong error message');
			}
			catch (e) {
				return done(e);
			}

			return done();
		});
	});
});
