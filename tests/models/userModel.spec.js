import { describe, it } from 'mocha';
import { expect } from 'chai';
import sinon from 'sinon';
import User from '../../models/userModel';
import argon2 from 'argon2';

describe('user', () => {
	describe('email', () => {
		it('should be invalid if email is empty', (done) => {
			const user = new User({
				password: 'password',
				fullname: 'Khaled Maged'
			});

			const validationError = user.validateSync();

			try {
				expect(validationError, 'validationError is undefined')
					.to.exist;
				expect(validationError.errors.email, 'errors.email doesn\'t exist')
					.to.exist;
				expect(validationError.errors.email.message)
					.to.equal('email is required', 'error message is wrong');
			}
			catch (e) {
				return done(e);
			}

			return done();
		});
	});

	describe('password', () => {
		it('should be invalid if password is empty', (done) => {
			const user = new User({
				email: 'user@domain.com',
				fullname: 'Khaled Maged'
			});

			const validationError = user.validateSync();

			try {
				expect(validationError, 'validationError is undefined')
					.to.exist;
				expect(validationError.errors.password, 'errors.password doesn\'t exist')
					.to.exist;
				expect(validationError.errors.password.message)
					.to.equal('password is required', 'error message is wrong');
			}
			catch (e) {
				return done(e);
			}

			return done();
		});
	});

	describe('fullname', () => {
		it('should be invalid if fullname is empty', (done) => {
			const user = new User({
				email: 'user@domain.com',
				password: 'password'
			});

			const validationError = user.validateSync();

			try {
				expect(validationError, 'validationError is undefined')
					.to.exist;
				expect(validationError.errors.fullname, 'errors.fullname doesn\'t exist')
					.to.exist;
				expect(validationError.errors.fullname.message)
					.to.equal('fullname is required', 'error message is wrong');
			}
			catch (e) {
				return done(e);
			}

			return done();
		});
	});

	describe('#setPassword', () => {
		it('should set user.password to hash', async () => {
			const hashStub = sinon.stub(argon2, 'hash').returns('hashed-password');

			const user = new User();
			await user.setPassword('password');

			sinon.assert.calledOnce(hashStub);
			sinon.assert.calledWithExactly(hashStub, 'password');

			expect(user.password, 'user.password is not set').to.exist;
			expect(user.password, 'user.password doesn\'t match hash').to.equal('hashed-password');

			return;
		});
	});

	describe('checkPassword', () => {
		it('should return true if password matches', async () => {
			const user = new User();
			await user.setPassword('password');
			const passwordMatch = await user.checkPassword('password');

			expect(passwordMatch, 'passwordMatch is not set')
				.to.exist;
			expect(passwordMatch, 'passwordMatch is not true')
				.to.be.true;

			return true;
		});

		it('should return false if password doesn\'t match', async () => {
			const user = new User();
			await user.setPassword('password');
			const passwordMatch = await user.checkPassword('password2');

			expect(passwordMatch, 'passwordMatch is not set')
				.to.exist;
			expect(passwordMatch, 'passwordMatch is not false')
				.to.be.false;

			return true;
		});
	});
});
