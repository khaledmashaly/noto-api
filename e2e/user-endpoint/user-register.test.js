import { describe, it } from 'mocha';
import request from 'supertest';
import { expect } from 'chai';

console.log(process.env.NODE_ENV);

import { app } from '../../src/app';

describe('POST /user', () => {
	it('responds with 201 on sucess', async () => {
		const newUser = {
			email: 'hello2@world.com',
			fullname: 'Hello World',
			password: 'helloworld',
			confirmPassword: 'helloworld'
		};

		await request(app)
			.post('/user')
			.send(newUser)
			.expect(201);
	});

	describe('Email Address', () => {
		it('must be unique', async () => {
			const newUser = {
				email: 'hello2@world.com',
				fullname: 'Hello World',
				password: 'helloworld',
				confirmPassword: 'helloworld'
			};

			await request(app)
				.post('/user')
				.send(newUser)
				.expect(201);

			await request(app)
				.post('/user')
				.send(newUser)
				.expect(422)
				.expect((res) => {
					expect(res.body.error).to.equal('duplicate key');
				});
		});

		it('must be valid', async () => {
			const newUser = {
				email: 'hello2world.com',
				fullname: 'Hello World',
				password: 'helloworld',
				confirmPassword: 'helloworld'
			};

			await request(app)
				.post('/user')
				.send(newUser)
				.expect(422)
				.expect((res) => {
					expect(res.body.errors[0]).to.exist;
					expect(res.body.errors[0].message).to.equal('"email" must be a valid email');
				});
		});

		it('is required', async () => {
			const newUser = {
				fullname: 'Hello World',
				password: 'helloworld',
				confirmPassword: 'helloworld'
			};

			await request(app)
				.post('/user')
				.send(newUser)
				.expect(422)
				.expect((res) => {
					expect(res.body.errors[0]).to.exist;
					expect(res.body.errors[0].message).to.equal('"email" is required');
				});
		});

		it('shouldn\'t be empty', async () => {
			const newUser = {
				email: '',
				fullname: 'Hello World',
				password: 'helloworld',
				confirmPassword: 'helloworld'
			};

			await request(app)
				.post('/user')
				.send(newUser)
				.expect(422)
				.expect((res) => {
					expect(res.body.errors[0]).to.exist;
					expect(res.body.errors[0].message).to.equal('"email" is not allowed to be empty');
				});
		});
	});

	describe('Password', () => {
		it('is required', async () => {
			const newUser = {
				email: 'hello2@world.com',
				fullname: 'Hello World',
				confirmPassword: 'helloworld'
			};

			await request(app)
				.post('/user')
				.send(newUser)
				.expect(422)
				.expect((res) => {
					expect(res.body.errors[0]).to.exist;
					expect(res.body.errors[0].message).to.equal('"password" is required');
				});
		});
	});

	describe('confirmPassword', () => {
		it('should equal password', async () => {
			const newUser = {
				email: 'hello2@world.com',
				fullname: 'Hello World',
				password: 'helloworld',
				confirmPassword: 'helloworl'
			};

			await request(app)
				.post('/user')
				.send(newUser)
				.expect(422)
				.expect((res) => {
					expect(res.body.errors[0]).to.exist;
					expect(res.body.errors[0].message).to.equal('"confirmPassword" must be [ref:password]');
				});
		});

		it('is required', async () => {
			const newUser = {
				email: 'hello2@world.com',
				fullname: 'Hello World',
				password: 'helloworld'
			};

			await request(app)
				.post('/user')
				.send(newUser)
				.expect(422)
				.expect((res) => {
					expect(res.body.errors[0]).to.exist;
					expect(res.body.errors[0].message).to.equal('"confirmPassword" is required');
				});
		});
	});

	describe('fullname', () => {
		it('is required', async () => {
			const newUser = {
				email: 'hello2@world.com',
				password: 'helloworld',
				confirmPassword: 'helloworld'
			};

			await request(app)
				.post('/user')
				.send(newUser)
				.expect(422)
				.expect((res) => {
					expect(res.body.errors[0]).to.exist;
					expect(res.body.errors[0].message).to.equal('"fullname" is required');
				});
		});
	});
});
